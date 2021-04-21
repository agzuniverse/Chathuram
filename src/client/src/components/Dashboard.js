import React, { useState, useEffect } from 'react';
import { readData } from '../api';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../css/Dashboard.css'
import Table from './Table';
import AddToDBTable from './AddDataToDBTable';


const Dashboard = (props) => {
    const tables = JSON.parse(localStorage.getItem('dbConfig'))?.tables

    const [tableName, setTableName] = useState(tables[0])
    const [rows, setRows] = useState()
    useEffect(() => {
        const { match: { params } } = props;
        if (params.tableName) {
            const tn = params.tableName;
            console.log(tn);
            setTableName(tn)
            readData(tableName).then(data => setRows(data.result))
        }
        else {
            readData(tableName).then(data => setRows(data.result))
        }
    }, []);

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
                                <Nav.Link href={`/dashboard/${curr}`}>{curr}</Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <AddToDBTable table={tableName} />
                    <Table data={rows} />
                </Col>
            </Row>
        </Container>
    );
}




export default Dashboard;
