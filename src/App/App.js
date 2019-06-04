import React from "react";
import "./App.scss";
import Editor from "./Editor";
import Header from "./Header";
import List from "./List";
import Menu from "./Menu";

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

                <List/>

                <Editor/>
            </div>
        </div>
    );
}

export default App;
