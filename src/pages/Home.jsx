import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to HealthTrack</h1>
      <p className="lead">A smart way to manage patients, records, and appointments.</p>

      <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
        Login
      </button>
    </div>
  );
};

export default Home;
