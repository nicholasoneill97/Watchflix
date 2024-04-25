import React from 'react';
import ReactDOM from 'react-dom/client';

//import global styles, enables tailwind
import './index.css';

//import App
import App from './App';

//import browser router for website router
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

