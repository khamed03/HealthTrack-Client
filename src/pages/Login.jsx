import React, { useState } from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, role, user_id, email: userEmail } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("email", userEmail);

      if (role === "doctor") {
        navigate("/dashboard");
      } else if (role === "secretary") {
        navigate("/appointments");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <Button
        variant="link"
        className="position-absolute top-0 start-0 m-3 text-primary"
        onClick={() => navigate("/")}
      >
        <i className="bi bi-house-fill me-2"></i> Home
      </Button>

      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <div className="d-flex justify-content-between">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <Button variant="secondary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
