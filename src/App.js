import React from 'react';
import { ToastProvider } from './components/Toast/ToastContext';
import ToastContainer from './components/Toast/ToastContainer';
import ToastDemo from './components/Toast/ToastDemo';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <ToastDemo />
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}

export default App;
