//5.3 //blogin lisäämislomake
const newBlog = ({ addBlog, newtitle, setNewtitle, newauthor, setNewauthor, newurl, setNewurl }) => {
    return (

        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        value={newtitle}
                        onChange={({ target }) => setNewtitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        value={newauthor}
                        onChange={({ target }) => setNewauthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        value={newurl}
                        onChange={({ target }) => setNewurl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>

    )
}

export default newBlog