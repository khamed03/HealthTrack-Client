import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      )}
    </div>
  );
};



export default AuthButtons;
