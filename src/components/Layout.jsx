import React from 'react';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="bg-light">
          <Sidebar />
        </Col>
        <Col xs={10} className="p-4">
          <Outlet /> {/* renders child route */}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
