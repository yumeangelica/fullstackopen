import BlogShow from './BlogShow'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

const HomeView = ({blogs, blogFormRef, addBlog }) => {

    return (
        <div>
            <h2>Blog App</h2>
            
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <NewBlogForm addBlog={addBlog}></NewBlogForm>
            </Togglable>
            
            <BlogShow
                blogs={blogs}
               
            />
        </div>
    )
}

export default HomeView