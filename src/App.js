import React from 'react';
import Routes from './routes';
import { StatesContextProvider } from './context/character';
import './styles.css';

export default function App() {
  return (
    <div className="app">
      <StatesContextProvider>
         <Routes />
      </StatesContextProvider>
    </div>
  );
}

