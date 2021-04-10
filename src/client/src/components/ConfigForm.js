import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { setConfig } from '../api';



const ConfigForm = ({ setDBConfig }) => {
    const [url, setURL] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await setConfig({
            url,
            username,
            password
        });
        setDBConfig(res);
    }

    return (
        <Form>
            <Form.Group controlId="formURL">
                <Form.Label>DB URL</Form.Label>
                <Form.Control type="text" placeholder="Enter DB URL" onChange={e => setURL(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit} >
                Submit
            </Button>
        </Form>
    );
}

export default ConfigForm;