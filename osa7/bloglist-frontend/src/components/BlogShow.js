import Blog from './Blog'
import Table from 'react-bootstrap/Table';


const BlogShow = ({ blogs, updateBlog, deleteBlog, user }) => {

    return (
        <Table striped>
            <tbody>

                <tr>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
                    )}
                </tr>

            </tbody>
        </Table>
    )
}

export default BlogShow