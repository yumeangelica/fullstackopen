import { useState, useEffect, useRef } from 'react' //useState, useEffect ja useRef hookit
import blogService from './services/blogs' //tuodaan blogService objekti
import loginService from './services/login' //tuodaan loginService objekti
import LoginForm from './components/LoginForm' //tuodaan LoginForm komponentti

import Alert from 'react-bootstrap/Alert'; //tuodaan Alert komponentti bootstrapista

import NavigationMenu from './components/NavigationMenu'
import HomeView from './components/HomeView'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

// tuodaan routerin importit
import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom'


const App = () => {
    const [blogs, setBlogs] = useState([]) //blogit, jotka haetaan backendistä
    const [username, setUsername] = useState('') //käyttäjän antama käyttäjätunnus // statessa olevaan muuttujaan ei camelcasea vaan setteriin
    const [password, setPassword] = useState('') //käyttäjän antama salasana
    const [user, setUser] = useState(null) //käyttäjä, joka on kirjautunut sisään


    const [validmessage, setValidmessage] = useState(null) //ilmoitus tallentuu tänne
    const [errormessage, setErrormessage] = useState(null) //virheilmoitus tallentuu tänne

    const blogFormRef = useRef() //käytetään reffiä, jotta komponentti voidaan piilottaa
    


    const sortBlogs = async () => {
        //5.10 sortataan blogit
        const blogs = await blogService.getAll() //haetaan kaikki blogit
        blogs.sort((a, b) => b.likes - a.likes) //sortataan blogit suurimmasta pienimpään
        setBlogs(blogs) //asetetaan blogit stateen
    }

    useEffect(() => {
        sortBlogs() //5.10
    }, []) //tyhjä array, jotta efekti ajetaan vain kerran

    //5.2 haetaan localstoragesta käyttäjä, jos käyttäjä löytyy, asetetaan käyttäjä stateen. näin käyttäjä pysyy kirjautuneena
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser') //haetaan localstoragesta käyttäjä
        if (loggedUserJSON) {
            //jos käyttäjä löytyy
            const user = JSON.parse(loggedUserJSON) //parsitaan käyttäjä
            setUser(user) //asetetaan käyttäjä stateen
            blogService.setToken(user.token) //asetetaan token blogServiceen
        }
    }, []) //tyhjä array, jotta efetti ajetaan vain kerran

    //kirjautumisen apufunktio
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                //tehdään login pyyntö loginServiceen
                username,
                password,
            })

            //tallennetaan token localstorageen nimellä loggedBlogappUser
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            //asetetaan token blogServiceen
            blogService.setToken(user.token)

            //asetetaan käyttäjä stateen
            setUser(user)

            //asetetaan käyttäjätunnus ja salasana tyhjiksi
            setUsername('')
            setPassword('')

            //haetaan blogit ja asetetaan ne blogs muuttujaan stateen
            blogService.getAll().then((blogs) => setBlogs(blogs))


            // validhappened = true //eilmoitus on vihreä
            setValidmessage(`login with ${username}`) //asetetaan vihreä ilmoitus onnistuneelle kirjautumiselle
            setTimeout(() => {
                //5 sekunnin kuluttua ilmoitus poistuu
                setValidmessage(null)
                // validhappened = false //ilmoitus poistuu
            }, 5000)
        } catch (err) {
            // errorhappened = true //virheilmoitus on punainen
            setErrormessage('wrong credentials') //asetetaan virheilmoitus

            setTimeout(() => {
                //5 sekunnin kuluttua virheilmoitus poistuu
                setErrormessage(null)
                // errorhappened = false //virheilmoitus poistuu
            }, 5000)
        }
    }

    //5.3 //blogin lisäämisen funktio
    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility() //päästään kiinni kyseiseen komponenttiin, jotta sen funktioita voidaan kutsua
        try {
            blogService.create(blogObject).then((returnedBlog) => {
                setBlogs(blogs.concat(returnedBlog))

                // validhappened = true //ilmoitus on vihreä

                setValidmessage(
                    `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
                ) //asetetaan vihreä ilmoitus onnistuneelle lisäykselles
                sortBlogs() //sortataan blogit uudelleen lisäyksen jälkeen
                setTimeout(() => {
                    setValidmessage(null)
                    // validhappened = false //ilmoitus poistuu
                }, 5000)
            })
        } catch (err) {
            // errorhappened = true //virheilmoitus on punainen
            setErrormessage('blog could not be added', err) //asetetaan virheilmoitus
            setTimeout(() => {
                //5 sekunnin kuluttua virheilmoitus poistuu
                setErrormessage(null)
                // errorhappened = false //virheilmoitus poistuu
            }, 5000)
        }
    }

    //5.2 logout funktio
    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
        // validhappened = true //ilmoitus on vihreä
        setValidmessage('logout successful') //asetetaan vihreä ilmoitus onnistuneelle uloskirjautumiselle
        setTimeout(() => {
            //5 sekunnin kuluttua ilmoitus poistuu
            setValidmessage(null)
            // validhappened = false //ilmoitus poistuu
        }, 5000)
    }

    const handleBlogUpdate = async (blogId, updatedBlog) => {
        //5.8 blogin päivitys, kaikkien tietojen päivitys
        try {
            const blog = await blogService.update(blogId, updatedBlog) //tehdään pyyntö backendiin, läheteään blogin id ja päivitetty blogi objektis
            console.log('blog updated')
            return blog
        } catch (err) {
            // errorhappened = true //virheilmoitus on punainen
            setErrormessage('blog could not be updated', err) //asetetaan virheilmoitus
            setTimeout(() => {
                //5 sekunnin kuluttua virheilmoitus poistuu
                setErrormessage(null)
                // errorhappened = false //virheilmoitus poistuu
            }, 5000)
        }
    }

    const handleBlogDelete = async (blogId) => {
        //5.9 blogin poisto

        try {
            const deleted = await blogService.deleteBlog(blogId) //tehdään pyyntö backendiin, läheteään blogin id

            // validhappened = true //ilmoitus on vihreä
            setValidmessage(
                `blog ${deleted.title} by ${deleted.author} deleted`
            ) //asetetaan vihreä ilmoitus onnistuneelle poistolle
            setTimeout(() => {
                //5 sekunnin kuluttua ilmoitus poistuu
                setValidmessage(null)
                // validhappened = false //ilmoitus poistuu
            }, 5000)

            sortBlogs() //sortataan blogit uudelleen poiston jälkeen


        } catch (err) {
            // errorhappened = true //virheilmoitus on punainen
            setErrormessage('blog could not be deleted', err) //asetetaan virheilmoitus
            setTimeout(() => {
                //5 sekunnin kuluttua virheilmoitus poistuu
                setErrormessage(null)
                // errorhappened = false //virheilmoitus poistuu
            }, 5000)
        }
    }

    //jos käyttäjä on kirjautunut sisään, näytetään blogilista, muuten loginform
    return (
        <Router>
            <div className="container">
                {validmessage && <Alert variant='success'>{validmessage}</Alert>}
                {errormessage && <Alert variant='danger'>{errormessage}</Alert>}

                {user === null ?
                    <>
                        <LoginForm
                            handleLogin={handleLogin}
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                        />
                    </>
                    :

                    <>
                        <NavigationMenu user={user} handleLogout={handleLogout} />
                        <Routes>
                            <Route path="/" element={<HomeView blogs={blogs} addBlog={addBlog} blogFormRef={blogFormRef} />} />
                            <Route path="/users" element={<UsersView />} />
                            <Route path="/users/:id" element={<UserView blogs={blogs}/>} />
                            <Route path="/blogs/:id" element={<BlogView handleBlogUpdate={handleBlogUpdate} handleBlogDelete={handleBlogDelete} user={user}/>} />
                        </Routes>

                    </>
                }

            </div>
        </Router>
    )
}

export default App
