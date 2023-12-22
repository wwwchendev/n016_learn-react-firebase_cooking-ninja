import React from 'react';
import { BrowserRouter,HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';
// 載入ContextProvider包裹子組件 #context
import { ThemeProvider } from './context/ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);

