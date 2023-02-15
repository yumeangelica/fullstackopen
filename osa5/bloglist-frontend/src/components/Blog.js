
import { useState } from 'react'
// import blogService from "../services/blogs"


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
        //päivitetään likesit reaaliaikaisesti stateen
        // .then(blog => { //kutsuu updateBlog funktiota, joka päivittää blogin
        //     setLikes(blog.likes) //päivitetään likesit reaaliaikaisesti stateen
        // })
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
                {blog.title}{blog.title && blog.author ? ' - ' : ''}{blog.author}<button onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</button>
                {isVisible ?
                    <div>
                        <div className="url">link: {blog.url}</div>
                        <div className="likes">likes: {bloglikes}<button className="likebutton" onClick={handleLikes}>like</button></div>
                    </div>
                    : <></>
                }
                
                {blog.user.username === user.username ? <button onClick={handleRemove}>remove</button> : <></>}
                

            </div>

        </>
    )

}

export default Blog