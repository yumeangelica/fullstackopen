// komponentti joka renderöi lomakkeen millä lisätään uusi henkilö

import { Form, Button } from 'react-bootstrap'

const NewPersonForm = (props) => {
    return (
        <>
            <Form onSubmit={props.functions[0]}>
                <Form.Group>

                    <Form.Label>
                        name:
                    </Form.Label>

                    <Form.Control
                        type="text"
                        name="name"
                        value={props.newName}
                        onChange={props.functions[1]}
                        className="input-width"
                    />

                    <Form.Label>
                        number:
                    </Form.Label>

                    <Form.Control
                        type="text"
                        name="number"
                        value={props.newNumber}
                        onChange={props.functions[2]}
                        className="input-width"
                    />


                    <Button variant="primary" type="submit" className="submit-btn">add</Button>


                </Form.Group>
            </Form>
        </>
    )
}

// Exportataan komponentti App.js tiedostoon
export default NewPersonForm  