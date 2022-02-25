import { BrowserRouter } from 'react-router-dom';
import ReactDom from 'react-dom';
import React from 'react';
import App from './app';

/**
 * @function launch
 * @description Initialize our app
 */
function launch() {
  ReactDom.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app-root'),
  );
}

if (document.readyState === 'complete') {
  launch();
} else {
  window.onload = launch;
}

// Enable HMR
if (process.env.NODE_ENV === 'development' && module && module.hot) {
  module.hot.accept('./app.tsx', () => {
    let HotApp = require('./app.tsx').default;
    ReactDom.render(
      <BrowserRouter>
        <HotApp />
      </BrowserRouter>,
      document.getElementById('app-root'),
    );
  });
}
