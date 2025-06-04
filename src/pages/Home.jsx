import React from 'react';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to HealthTrack</h1>
      <p className="lead">A smart way to manage patients, records, and appointments.</p>

      <button
        className="btn btn-primary"
        onClick={() => window.location.href = 'http://localhost:5173/login'}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
