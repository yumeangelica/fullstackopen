

import { Link } from 'react-router-dom'

const Blog = ({ blog }) => { // Blogin renderöivä komponentti
   
    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 2,
        borderWidth: 1,
        marginBottom: 5,
        border: '1px solid pink',
        borderRadius: 5,

    }




    return (
        <>

            <tr style={blogStyle} className='blog'>
                
                <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td><td>{blog.title && blog.author ? ' by ' : ''}</td><td>{blog.author}</td>

            </tr>

        </>
    )

}

export default Blog