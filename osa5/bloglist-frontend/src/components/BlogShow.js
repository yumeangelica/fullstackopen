import Blog from './Blog'


const BlogShow = ({ blogs, updateBlog, deleteBlog }) => {

    return (
        <div >
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
            )}
        </div>
    )
}

export default BlogShow