import { useState, useEffect } from 'react'
import blogsService from '../services/blogs'

import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table';

const UsersView = () => { // 7.14 näyttää käyttäjät ja niiden blogit

    const [users, setUsers] = useState([])

    useEffect(() => {
        blogsService.getUsers().then(users => {
            setUsers(users)
        })
    }, [])



    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>username:</th>
                        <th>blogs created:</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    )





}



export default UsersView