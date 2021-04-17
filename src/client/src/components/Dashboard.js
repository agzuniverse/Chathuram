import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './Dashboard.css';
import Table from './Table';


const Dashboard = ({ id }) => {

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Nav className="col-md-12 d-none d-md-block bg-dark sidebar"
                            activeKey="/home"
                        >
                            <div className="sidebar-sticky"></div>
                            <Nav.Item>
                                <Nav.Link href="/table1">Table 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/table2">Table 2</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/table3">Table 3</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        <Table id={id} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}




export default Dashboard;