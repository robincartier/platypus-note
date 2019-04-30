import React from 'react';
import logo from 'images/logo.svg';
import './App.css';
import Editor from './Editor';
import Header from './Header';
import List from './List';
import Menu from './Menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>

      <nav>
        <Menu/>
      </nav>

      <div className="Page">
        <div className="Note-list">
          <List/>
        </div>

        <div className="Editor">
          <Editor/>
        </div>
      </div>
    </div>
  );
}

export default App;
