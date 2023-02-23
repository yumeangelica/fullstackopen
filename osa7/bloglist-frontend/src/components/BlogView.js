import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import blogsService from '../services/blogs'

import Button from 'react-bootstrap/Button'

import { useNavigate } from 'react-router-dom'

const BlogView = ({user, handleBlogUpdate, handleBlogDelete}) => { // 7.16 yksittäisen blogin näkymä
    const navigate = useNavigate()
    const blogId = useParams().id // otetaan klikatun blogin id
    const [blog, setBlog] = useState(null)
    const [bloglikes, setBloglikes] = useState(0) //5.9 likes state jotta voidaan päivittää likesit reaaliaikaisesti
    const [bloguser, setBloguser] = useState(null) //5.10 bloguser state jotta voidaan tarkistaa, onko kirjautunut käyttäjä sama kuin blogia lisännyt käyttäjä

    useEffect(() => {
        blogsService.getBlogById(blogId).then(blog => { // haetaan blog backendistä
            setBlog(blog)
            setBloglikes(blog.likes)

            blogsService.getUserById(blog.user).then(user => { // haetaan user backendistä
                setBloguser(user)
            })

        })  
    }, [blogId]) //tyhjä array, jotta efekti ajetaan vain kerran




    const handleLikes = async (event) => { // 5.9
        event.preventDefault()

        let updatedBlogObject = { //luodaan uusi blogi, joka sisältää vanhan blogin tiedot ja lisätään likes yhdellä
            title: blog.title,
            author: blog.author,
            likes: bloglikes + 1,
            url: blog.url
        }

        //kutsutaan blogService.update funktiota, joka päivittää blogin
        // handleBlogUpdate(blog.id, updatedBlog).then(updatedBlog => {
        //     setBloglikes(updatedBlog.likes)
        // })
        try {
            const updatedBlog = await handleBlogUpdate(blog.id, updatedBlogObject)
            setBloglikes(updatedBlog.likes)
        } catch (error) {
            console.log(error)
        }

    }

    const handleRemove = (event) => { //5.10
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                handleBlogDelete(blog.id)
                console.log(`Removed blog ${blog.title} by ${blog.author}`)
                navigate('/')
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    
    if (!blog || !bloguser) {
        return null
    }
    

    return (
        <div>
            <h2>{blog.title}{blog.author ? ' by ' : ''}{blog.author}</h2>

            <div>
                <div className="url"><a href={blog.url} target="_blank" rel="noreferrer" >{blog.url}</a></div>
                <div className="likes"> {bloglikes} Likes
                <Button className="likebutton" variant='primary' onClick={handleLikes}>like</Button>    
                
                {bloguser.username === user.username ? <Button variant='warning' onClick={handleRemove}>remove</Button> : <></>}
                
                </div>
                <div className="user">added by {blog.author}</div>
            </div>           
            
        </div>
    )
}



export default BlogView