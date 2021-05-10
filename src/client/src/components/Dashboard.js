import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../css/Dashboard.css'
import Table from './Table';

const Dashboard = (props) => {
    const history = useHistory()
    const tables = JSON.parse(localStorage.getItem('dbConfig'))?.tables
    const [tableName, setTableName] = useState(null)

    // Going to URL with table name should result in that table's data being fetched
    useEffect(() => {
        const { match: { params } } = props;
        if (params.tableName) {
            setTableName(params.tableName)
        } else if (tables) {
            // When URL does not specify a table, display the first table
            setTableName(tables[0])
        }
    }, []);

    const editRow = (rowData) => {
        window.location.href = `${window.location.href}dashboard/edit`
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Nav className="col-md-12 d-none d-md-block bg-dark sidebar"
                        activeKey="/home">
                        <div className="sidebar-sticky"></div>
                        {tables && tables.map((curr, index) =>
                            <Nav.Item key={index}>
                                <Nav.Link href={`/dashboard/${curr}`}>{curr}</Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Button variant="primary" type="submit" id="create-button" onClick={e => {
                        e.preventDefault();
                        history.push({ pathname: '/create', oldRow: {}, tableName: tableName })
                    }}>
                        Add Row
                    </Button>
                    <Table tableName={tableName} />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
