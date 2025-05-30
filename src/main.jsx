import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const domain = 'dev-t631y0wf12z70tvb.us.auth0.com';
const clientId = 'ySNQyf8R4IWd7iYEak5ieU7PPgBV7g8S';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
        audience: "https://dev-t631y0wf12z70tvb.us.auth0.com/api/v2/"
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
