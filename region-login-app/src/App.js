import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import { RegionProvider } from './RegionContext';

function App() {
  return (
    <RegionProvider>
      <div className="App">
        <LoginPage />
      </div>
    </RegionProvider>
  );
}

export default App;
