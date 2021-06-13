import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../css/Dashboard.css'
import Table from './Table';
import { checkServerLife } from '../api';

const Dashboard = (props) => {
    const history = useHistory()
    const tables = JSON.parse(localStorage.getItem('dbConfig'))?.tables
    const [tableName, setTableName] = useState(null)
    const [pageNum, setPageNum] = useState(null)

    useEffect(() => {
        // If the server loses connection with the DB, go back to DB config screen
        checkServerLife().then(data => {
            if (data.error) {
                localStorage.removeItem('dbConfigured')
                window.location.replace('/')
            }
        })
        // Going to URL with table name should result in that table's data being fetched
        const { match: { params } } = props;
        if (params.tableName) {
            setTableName(params.tableName)
            if (params.pageNum) {
                setPageNum(params.pageNum)
            }
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
                        history.push({ pathname: '/create', tableName: tableName })
                    }}>
                        Add Row
                    </Button>
                    <Table tableName={tableName} pageNum={pageNum} />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
