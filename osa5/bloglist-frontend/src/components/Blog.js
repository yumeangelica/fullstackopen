
import { useState } from 'react'
// import blogService from "../services/blogs"


const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [isVisible, setIsVisible] = useState(false)

  const [ likes, setLikes ] = useState(blog.likes) //5.9 likes state jotta voidaan päivittää likesit reaaliaikaisesti
  likes

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

  const handleLikes = (event) => { // 5.9
    event.preventDefault()

    let updatedBlog = { //luodaan uusi blogi, joka sisältää vanhan blogin tiedot ja lisätään likes yhdellä
      title: blog.title,
      author: blog.author,
      likes: blog.likes += 1,
      url: blog.url
    }

    //kutsutaan blogService.update funktiota, joka päivittää blogin
    updateBlog(blog.id, updatedBlog).then(blog => { //kutsuu updateBlog funktiota, joka päivittää blogin
      setLikes(blog.likes) //päivitetään likesit reaaliaikaisesti stateen
    })
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

      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</button>
        {isVisible ?
          <div>
            <div>link: {blog.url}</div>
            <div>likes: {blog.likes}<button onClick={handleLikes}>like</button></div>
          </div>
          : <></>
        }
        <button onClick={handleRemove}>remove</button>

      </div>

    </>
  )

}

export default Blog