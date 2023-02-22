
import { useState } from 'react'
// import blogService from "../services/blogs"

import Button from 'react-bootstrap/Button'; //tuodaan Button komponentti bootstrapista


const Blog = ({ blog, updateBlog, deleteBlog, user }) => { // Blogin renderöivä komponentti
    const [isVisible, setIsVisible] = useState(false)

    const [bloglikes, setBloglikes] = useState(blog.likes) //5.9 likes state jotta voidaan päivittää likesit reaaliaikaisesti

    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 2,
        borderWidth: 1,
        marginBottom: 5,
        border: '1px solid pink',
        borderRadius: 5,

    }

    const handleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleLikes = async (event) => { // 5.9
        event.preventDefault()

        let updatedBlog = { //luodaan uusi blogi, joka sisältää vanhan blogin tiedot ja lisätään likes yhdellä
            title: blog.title,
            author: blog.author,
            likes: setBloglikes(bloglikes + 1),
            url: blog.url
        }

        //kutsutaan blogService.update funktiota, joka päivittää blogin
        updateBlog(blog.id, updatedBlog)

    }

    const handleRemove = (event) => { //5.10
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                deleteBlog(blog.id)
                console.log(`Removed blog ${blog.title} by ${blog.author}`)
            }
            catch (error) {
                console.log(error)
            }
        }
    }




    return (
        <>

            <div style={blogStyle} className='blog'>
                {blog.title}{blog.title && blog.author ? ' - ' : ''}{blog.author}<Button variant='info' onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</Button>
                {isVisible ?
                    <div>
                        <div className="url">link: {blog.url}</div>
                        <div className="likes">likes: {bloglikes}<Button className="likebutton" variant='primary' onClick={handleLikes}>like</Button></div>
                    </div>
                    : <></>
                }
                
                {blog.user.username === user.username ? <Button variant='warning' onClick={handleRemove}>remove</Button> : <></>}
                

            </div>

        </>
    )

}

export default Blog