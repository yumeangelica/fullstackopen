import { useState, useEffect } from 'react' //useState ja useEffect hookit
import Blog from './components/Blog'
import blogService from './services/blogs' //tuodaan blogService objekti
import loginService from './services/login' //tuodaan loginService objekti

import LoginForm from './components/LoginForm' //tuodaan LoginForm komponentti



const App = () => {
  const [blogs, setBlogs] = useState([]) //blogit, jotka haetaan backendistä
  const [username, setUsername] = useState('') //käyttäjän antama käyttäjätunnus // statessa olevaan muuttujaan ei camelcasea vaan setteriin
  const [password, setPassword] = useState('') //käyttäjän antama salasana
  const [user, setUser] = useState(null) //käyttäjä, joka on kirjautunut sisään
  const [errormessage, setErrormessage] = useState(null) //virheilmoitus, jos kirjautuminen epäonnistuu

  const [successmessage, setSuccessmessage] = useState(null) //5.4 onnistumisilmoitus, jos kirjautuminen onnistuu

  //5.3
  const [newtitle, setNewtitle] = useState('') //käyttäjän antama uuden blogin title
  const [newauthor, setNewauthor] = useState('') //käyttäjän antama uuden blogin author
  const [newurl, setNewurl] = useState('') //käyttäjän antama uuden blogin url



  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])


  //5.2 haetaan localstoragesta käyttäjä, jos käyttäjä löytyy, asetetaan käyttäjä stateen. näin käyttäjä pysyy kirjautuneena
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser') //haetaan localstoragesta käyttäjä
    if (loggedUserJSON) { //jos käyttäjä löytyy
      const user = JSON.parse(loggedUserJSON) //parsitaan käyttäjä
      setUser(user) //asetetaan käyttäjä stateen
      blogService.setToken(user.token) //asetetaan token blogServiceen
    }
  }, []) //tyhjä array, jotta efetti ajetaan vain kerran






  //kirjautumisen apufunktio
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ //tehdään login pyyntö loginServiceen
        username, password
      })


      //tallennetaan token localstorageen nimellä loggedBlogappUser
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )


      //asetetaan token blogServiceen
      blogService.setToken(user.token)

      //asetetaan käyttäjä stateen
      setUser(user)

      //asetetaan käyttäjätunnus ja salasana tyhjiksi
      setUsername('')
      setPassword('')


      //haetaan blogit ja asetetaan ne blogs muuttujaan stateen
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )


    } catch (exception) {
      setErrormessage('wrong credentials') //asetetaan virheilmoitus
      console.log('wrong credentials')
      console.log('exception: ', exception)
      alert('wrong credentials')
      setTimeout(() => { //5 sekunnin kuluttua virheilmoitus poistuu
        setErrormessage(null)
      }, 5000)
    }
  }






  //blogilistan apufunktio näyttämään blogit
  const blogShow = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )


  //5.3 //renderöi blogin lisäämislomakkeen, laitetaan myöhemmin omaan komponenttiin
  const newBlog = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newtitle}
            onChange={({ target }) => setNewtitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={newauthor}
            onChange={({ target }) => setNewauthor(target.value)}
          />
          </div>
        <div>
          url:
          <input
            value={newurl}
            onChange={({ target }) => setNewurl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )


  //5.3 //blogin lisäämisen funktio
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newtitle,
      author: newauthor,
      url: newurl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewtitle('')
        setNewauthor('')
        setNewurl('')
        setSuccessmessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessmessage(null)
        }, 5000)
      })
  }





  const userShow = () => (
    <div>
      <p>{user.name} logged in</p>
    </div>
  )


  //5.2 logout
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }






  //Now login, logout and bloglist show is working
  //GOING TO RECFACTOR THIS TO COMPONENTS

  return (
    <div>

      {errormessage}
      {successmessage}


      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/> :
        

        <div>
          <h2>blogs</h2>
          {userShow()}
          <button onClick={handleLogout}>logout</button>
          {newBlog()}
          {blogShow()}

        </div>}


    </div>)
}











export default App
