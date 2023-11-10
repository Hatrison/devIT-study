import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { GlobalStyle } from './GlobalStyles.styled';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App playersNum={4} />
    <GlobalStyle />
  </React.StrictMode>
);
