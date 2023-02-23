import Blog from './Blog'
import Table from 'react-bootstrap/Table'


const BlogShow = ({ blogs }) => {

    return (
        <Table striped>
            <tbody>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </tbody>
        </Table>
    )
}

export default BlogShow


