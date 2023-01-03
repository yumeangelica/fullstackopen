//5.3 //blogin lisäämislomake
const newBlog = ({ addBlog, newtitle, setNewtitle, newauthor, setNewauthor, newurl, setNewurl, newblogformvisible, setNewblogformvisible }) => {


    const hideWhenVisible = { display: newblogformvisible ? 'none' : '' } //5.5 kontrolloi blogin lisäämislomakkeen näkyvyyttä
    const showWhenVisible = { display: newblogformvisible ? '' : 'none' }


    return (
        <div>

            <div style={hideWhenVisible}>
                <button onClick={() => setNewblogformvisible(true)}>create new blog</button>
            </div>

            <div style={showWhenVisible}>
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
                <button onClick={() => setNewblogformvisible(false)}>cancel</button>
            </div>
        </div>

    )
}

export default newBlog