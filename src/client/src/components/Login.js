import React, { useState, useContext } from 'react';
import { loginUser } from '../api';
import { ErrorContext } from '../Contexts';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Header } from './Header';
import '../css/forms.css'


const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const { errorMessage, setErrorMessage } = useContext(ErrorContext)

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        if (token.error) {
            setErrorMessage(token.error)
        }
        else setToken(token);
    }

    return (
        <div>
            <Header />
            <Container>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={e => setUserName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="light" type="submit" onClick={handleSubmit} className="full-btn">
                                S U B M I T
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

        </div>

    );
}


export default Login;