import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../css/Dashboard.css'
import Table from './Table';

const Dashboard = ({ id }) => {
    const tables = JSON.parse(localStorage.getItem('dbConfig'))?.tables

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
                                <Nav.Link href={`/${curr}`}>{curr}</Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Table id={id} />
                </Col>
            </Row>
        </Container>
    );
}




export default Dashboard;