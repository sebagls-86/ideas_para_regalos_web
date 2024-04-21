import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';

 const root = createRoot(document.getElementById('root'));

 const dom = "dev-oraf1nl35nag2oxd.us.auth0.com";
 const clientID = "WTy5RLUirpCMGFljN9YsxVOvzCF6XT4m";
 const aud = "https://dev-oraf1nl35nag2oxd.us.auth0.com/api/v2/";
 const redirectUri = process.env.NODE_ENV === 'production' ? 'https://ideaspararegalos.vercel.app' : 'http://localhost:3000';


root.render(
<Auth0Provider
            domain={dom}
            clientId={clientID}
            redirectUri={redirectUri}
            audience={aud}   
            scope= "read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
);
