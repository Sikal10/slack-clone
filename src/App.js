import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="app__body">
                    <Sidebar/>
                    <Switch>
                        <Route exact path={"/"}><h2>Home</h2></Route>
                        <Route path={"/channel/:channelId"}> <Chat /></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
