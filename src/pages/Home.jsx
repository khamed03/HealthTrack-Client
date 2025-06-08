import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/HealthTrack Logo.png";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.get("https://zenquotes.io/api/today");
        if (res.data && res.data.length > 0) {
          setQuote(`"${res.data[0].q}" — ${res.data[0].a}`);
        }
      } catch (err) {
        console.error("Failed to fetch quote:", err.message);
        setQuote("Keep pushing forward.");
      }
    };

    fetchQuote();
  }, []);

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center"
    >
      <h1 className="mb-4">Welcome to HealthTrack</h1>

      <img
        src={logo}
        alt="HealthTrack Logo"
        style={{ width: "150px", height: "auto", marginBottom: "20px" }}
      />

      <div className="d-flex gap-3 mb-4">
        <Button variant="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="secondary" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>

      <div className="mt-4" style={{ maxWidth: "600px" }}>
        <blockquote className="blockquote">
          <p className="mb-0">Quote Of The Day: "{quote}"</p>
        </blockquote>

        <Footer />
      </div>
    </Container>
  );
};

export default Home;
