import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import blogsService from '../services/blogs'

const UserView = ({blogs}) => { // 7.15 yksittäisen käyttäjän näkymä ja sen blogits
    const id = useParams().id // otetaan klikatun userin id
    
    const [user, setUser] = useState(null) //käyttäjä, joka on kirjautunut sisään
    const [filteredBlogs, setFilteredBlogs] = useState([])

    useEffect(() => {
        blogsService.getUserById(id).then(user => { // haetaan user backendistä
            // console.log('user: ', user)
            setUser(user)
        })
        setFilteredBlogs(blogs.filter(blog => blog.user.id === id)) // filtteröidään blogit, joiden user.id vastaa klikatun userin id:tä
    }, [id, blogs]) //tyhjä array, jotta efekti ajetaan vain kerran

    if (!user) {
        return null
    }
    
    
    return (
      <div>
        <h2>{user.name}</h2>

        <h4>added blogs:</h4>

        <ul>
            {filteredBlogs.map(blog => 
            <li key={blog.id}>{blog.title}</li>
            )}
            
            
        </ul>

        
      </div>
    )
  }
  
  export default UserView