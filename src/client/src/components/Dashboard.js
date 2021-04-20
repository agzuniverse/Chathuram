import React, { useState, useEffect } from 'react';
import { getTablesList, readData } from '../api';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../css/Dashboard.css'
import Table from './Table';

const Dashboard = () => {

    const [tables, setTables] = useState()
    const [table, setTable] = useState()
    useEffect(() => {
        getTablesList().then(data => {
            setTables(data.tables)
            readData(data.tables[0]).then(data => {
                setTable(data.rows)
                console.log(data);
            })
        })
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Nav className="col-md-12 d-none d-md-block bg-dark sidebar"
                        activeKey="/home"
                    >
                        <div className="sidebar-sticky"></div>
                        {tables && tables.map((curr, index) =>
                            <Nav.Item key={index}>
                                <Nav.Link href={`/${curr}`} onClick={() => setTable(curr)}>{curr}</Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Table data={table} />
                </Col>
            </Row>
        </Container>
    );
}




export default Dashboard;
