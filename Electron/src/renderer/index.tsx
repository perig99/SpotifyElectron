import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import initOpenAPIClient from '../swagger/openAPIClientInit';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';

// Activation why-did-you-render in development mode
if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true, // Component tracking
    logOnDifferentValues: true,
    include: [/^.*$/],
  });
}

initOpenAPIClient();
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
