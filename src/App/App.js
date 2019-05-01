import React from 'react';
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

      <div className="Page">

        <nav className="Menu">
          <Menu/>
        </nav>

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
