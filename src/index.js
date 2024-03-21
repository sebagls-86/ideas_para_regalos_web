import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { getConfig } from "./config";

const root = createRoot(document.getElementById('root'));
const config = getConfig();

root.render(
<Auth0Provider
            domain={config.domain}
            clientId={config.clientId}
            redirectUri={window.location.origin}
            audience={config.audience}   
            scope= "read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
);
