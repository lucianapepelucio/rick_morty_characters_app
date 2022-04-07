import React from 'react';
import './styles.css';
import Routes from './routes';
import { StatesContextProvider } from './context/character';

export default function App() {
  return (
    <div className="app">
      <StatesContextProvider>
         <Routes />
      </StatesContextProvider>
    </div>
  );
}

