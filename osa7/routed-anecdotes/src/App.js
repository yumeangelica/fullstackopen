import { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

import { useField } from './hooks/index' // 7.4 custom hooks



// Anecdote-komponentti, joka näyttää yhden anekdootin
const Anecdote = ({ anecdotes, vote }) => {
    const id = useParams().id // params muuttaa id:n stringiksi
    const anecdote = anecdotes.find(n => n.id === Number(id)) // etsitään anekdootti id:n perusteella
    
    return (
        <>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes</p><button onClick={() => vote(anecdote)}>Vote</button>
            <p>for more info see <a href={anecdote.url}>{anecdote.url}</a></p>
        </>
    )

}

// AnecdoteList-komponentti, joka näyttää anekdootit listana
const AnecdoteList = ({ anecdotes }) => {
    return (
        <>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <li key={anecdote.id} >
                        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                    </li>)}
            </ul>
        </>
    )
}


// About-komponentti, joka näyttää about-sivun
const About = () => (
    <>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </>
)

// Footer-komponentti, joka näyttää footerin
const Footer = () => (
    <>
        Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

        See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </>
)


// Uuden anekdootin luonti komponentti
const CreateNew = (props) => {
    const fieldContent = useField('text') // 7.4 custom hooks
    const fieldAuthor = useField('text') // 7.4 custom hooks
    const fieldUrl = useField('text') // 7.4 custom hooks

    const navigate = useNavigate() // 7.3 uudelleenreititys postauksen jälkeen

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: fieldContent.value, // 7.4 custom hooks
            author: fieldAuthor.value, // 7.4 custom hooks
            url: fieldUrl.value, // 7.4 custom hooks
            votes: 0
        })

        props.setNotification(`a new anecdote ${fieldContent.value} created!`) // 7.3 ilmoitus uuden anekdootin luomisesta
        navigate('/') // 7.3 uudelleenreititys postauksen jälkeen, ohjautuu etusivulle
        setTimeout(() => { // ilmoituksen poisto 5 sekunnin kuluttua
            props.setNotification('')
        }, 5000)
    }

    const resetFields = (event) => { // 7.5 custom hooks
        event.preventDefault() // estetään sivun uudelleenlataus
        fieldContent.reset()
        fieldAuthor.reset()
        fieldUrl.reset()
    }

    return (
        <>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...fieldContent} /> {/* 7.4 custom hooks */}
                </div>
                <div>
                    author
                    <input {...fieldAuthor} /> {/* 7.4 custom hooks */}
                </div>
                <div>
                    url
                    <input {...fieldUrl} /> {/* 7.4 custom hooks */}
                </div>
                <button>create</button>
                <button onClick={resetFields}>reset</button>
            </form>
        </>
    )

}



// App-komponentti, pääohjelma tapahtuu tässä
const App = () => {

    const padding = { // tyyliobjekti linkkien väliin
        paddingRight: 5
    }

    const [anecdotes, setAnecdotes] = useState([ // anekdootit statessa
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            url: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            url: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    // Pääohjelman funktiot -----------

    const [notification, setNotification] = useState('') // ilmoitus statessa

    const addNew = (anecdote) => { // lisää uuden anekdootin
        anecdote.id = Math.round(Math.random() * 10000) // generoi id:n ja lisää sen anekdootti objektiin
        setAnecdotes(anecdotes.concat(anecdote)) // lisää anekdoottiobjektis staten anekdoottilistaan
    }

    const vote = (anecdote) => { // lisää äänen anekdootille
        
        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        
        setAnecdotes(anecdotes.map(a => a.id === anecdote.id ? voted : a))
    }


    // pääohjelman renderöinti ------------
    return (
        <>
            <h1>Software anecdotes</h1>

            <Router>
                <div>
                    <Link style={padding} to="/">anecdotes</Link>
                    <Link style={padding} to="/create">create new</Link>
                    <Link style={padding} to="/about">about</Link>
                </div>

                {notification}

                <Routes>
                    <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} vote={vote}/>} /> {/* näyttää yksittäisen anekdootin id:n perusteella */}
                    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} /> {/* näyttää kaikki anekdootit oletusnäkymänä juuripolusta */}
                    <Route path="/about" element={<About />} /> {/* näyttää about-sivun */}
                    <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} /> {/* näyttää lomakkeen uuden anekdootin luomiseen */}

                </Routes>


            </Router>

            <Footer />
        </>
    )
}

export default App
