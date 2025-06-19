import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import LoginFrame from './components/LoginFrame';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <LoginFrame />
      </main>
    </div>
  );
}

export default App;
