import React, { useState } from 'react';
import { setConfig } from '../api';
import { Form, Button, Container, Card } from 'react-bootstrap';
import Header from './Header';
import '../css/forms.css'

const dbtypes = ['mysql', 'postgres'];

const ConfigForm = ({ setDBConfig }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [url, setURL] = useState();
    const [port, setPort] = useState();
    const [db_name, setDBName] = useState();
    const [db_type, setDBType] = useState(dbtypes[0]);


    const handleSubmit = async e => {
        e.preventDefault();
        const res = await setConfig({
            username,
            password,
            url,
            port,
            db_name,
            db_type
        });
        setDBConfig(res);
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
                            <Form.Group controlId="formURL">
                                <Form.Label>DB URL</Form.Label>
                                <Form.Control type="text" placeholder="Enter DB URL" onChange={e => setURL(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Port</Form.Label>
                                <Form.Control type="text" placeholder="Enter port" onChange={e => setPort(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>DB Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter DB Name" onChange={e => setDBName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>DB Type</Form.Label>
                                <Form.Control as="select" custom onChange={e => setDBType(e.target.value)}>
                                    {dbtypes.map((option, idx) => <option key={idx} value={option}>{option}</option>)}
                                </Form.Control>
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

export default ConfigForm;