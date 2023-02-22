import Button from 'react-bootstrap/Button' //tuodaan Button komponentti bootstrapista


const userShow = ({ name, handleLogout }) => {
    return (
        <div>
            <p>{name} logged in</p>
            <Button variant='dark' onClick={handleLogout}>logout</Button>
        </div>
    )
}


export default userShow