import { useState, useEffect } from 'react' //useState ja useEffect hookit
import blogService from './services/blogs' //tuodaan blogService objekti
import loginService from './services/login' //tuodaan loginService objekti

import BlogShow from './components/BlogShow' //tuodaan BlogShow komponentti
import LoginForm from './components/LoginForm' //tuodaan LoginForm komponentti

import ErrorMessage from './components/ErrorMessage' //tuodaan ErrorMessage komponenttis

import UserShow from './components/UserShow' //tuodaan UserShow komponentti

import NewBlogForm from './components/NewBlogForm' //tuodaan NewBlogForm komponentti
import Togglable from './components/Togglable' //tuodaan Togglable komponentti

// Alustetaan virheilmoitukselle arvo false, kontrolloi onko punainen vai ei
let errorhappened = false


const App = () => {
  const [blogs, setBlogs] = useState([]) //blogit, jotka haetaan backendistä
  const [username, setUsername] = useState('') //käyttäjän antama käyttäjätunnus // statessa olevaan muuttujaan ei camelcasea vaan setteriin
  const [password, setPassword] = useState('') //käyttäjän antama salasana
  const [user, setUser] = useState(null) //käyttäjä, joka on kirjautunut sisään
  const [errormessage, setErrormessage] = useState(null) //virheilmoitus tallentuu tänne

  //5.3
  // const [newtitle, setNewtitle] = useState('') //käyttäjän antama uuden blogin title //siirretty komponennttiin NewBlogForm
  // const [newauthor, setNewauthor] = useState('') //käyttäjän antama uuden blogin author
  // const [newurl, setNewurl] = useState('') //käyttäjän antama uuden blogin url

 



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
      errorhappened = true //virheilmoitus on punainen
      setErrormessage('wrong credentials') //asetetaan virheilmoitus
      console.log('wrong credentials')
      console.log('exception: ', exception)
      alert('wrong credentials')
      setTimeout(() => { //5 sekunnin kuluttua virheilmoitus poistuu
        setErrormessage(null); errorhappened = false //virheilmoitus poistuu
      }, 5000)
    }
  }




  //5.3 //blogin lisäämisen funktio
  const addBlog = (blogObject) => {
    
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        
      
        setErrormessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`) //asetetaan vihreä virheilmoitus onnistuneelle lisäykselles
        setTimeout(() => {
          setErrormessage(null)
        }, 5000)
      })
  }
 



  //5.2 logout funktio
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }


  //shows loginform if user is not logged in, shows blogs if user is logged in
  return (
    <div>
      <ErrorMessage message={errormessage} errorhappened={errorhappened} />

      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :

        <div>
          <h2>blogs</h2>
          <UserShow name={user.name} handleLogout={handleLogout} />


          <Togglable buttonLabel="new blog"> 
            <NewBlogForm addBlog={addBlog}></NewBlogForm>
          </Togglable>

          <BlogShow blogs={blogs} />

        </div>}

    </div>)
}



export default App
