import Blog from "./Blog"

const BlogShow = ({ blogs }) => {
    return (

        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

}

export default BlogShow