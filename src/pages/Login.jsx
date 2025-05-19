import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Login = () => {
  const handleLogin = () => {
    // This is where you’ll trigger Auth0 login
    console.log("Login clicked");
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row>
        <Col>
          <Card style={{ width: '25rem' }} className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center">HealthTrack Login</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="button" className="w-100" onClick={handleLogin}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default Login;

