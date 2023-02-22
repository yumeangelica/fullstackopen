//importataan tyylittelyyn boostrapin komponentit
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


//5.3 ja 5.6 //blogin lisäämisen lomake ja sen käsittely

import { useState } from 'react'

const BlogForm = ({ addBlog }) => { //addBlog on funktio, joka on App.js:ssä

    //state muuttujat ja niiden asettaminen komponentin sisällä
    const [newtitle, setNewtitle] = useState('') //käyttäjän antama uuden blogin title
    const [newauthor, setNewauthor] = useState('') //käyttäjän antama uuden blogin author
    const [newurl, setNewurl] = useState('') //käyttäjä

    //blogin lisäämisen käsittely
    const addBlogHandle = (event) => { //event on tapahtuma, joka tapahtuu kun lomaketta lähetetään
        event.preventDefault() //estetään lomakkeen lähettäminen normaalisti
        addBlog({ //kutsutaan addBlog funktiota, joka on App.js:ssä
            title: newtitle, //uuden blogin title
            author: newauthor, //uuden blogin author
            url: newurl //uuden blogin url
        })

        setNewtitle('') //asetetaan title, author ja url tyhjiksi
        setNewauthor('') //asetetaan title, author ja url tyhjiksi
        setNewurl('') //asetetaan title, author ja url tyhjiksi
    }


    return (
        <div>
            <h3>Create a new blog</h3>
            <Form onSubmit={addBlogHandle}>
                <Form.Group>

                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={newtitle}
                        onChange={({ target }) => setNewtitle(target.value)}
                    />



                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={newauthor}
                        onChange={({ target }) => setNewauthor(target.value)}
                    />



                    <Form.Label>Url:</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        value={newurl}
                        onChange={({ target }) => setNewurl(target.value)}
                    />



                    <Button variant='success' id='blogsubmit' type="submit">save</Button>

                </Form.Group>
            </Form>
        </div>
    )

}

export default BlogForm