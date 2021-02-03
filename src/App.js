import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import Login from "./components/Login/Login";
import {auth} from "./firebase";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user is logged in
                dispatch(login({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName
                }))
            } else {
                //user isn't logged in
                dispatch(logout());
                console.log("user is logged out")
            }
        })
    }, [dispatch])

    return (
        <Router>
            <div className="App">
                {!user ? <Login /> :
                    <>
                    <Header/>
                    <div className="app__body">
                        <Sidebar/>
                        <Switch>
                            <Route exact path={"/"}><h2>Select a channel below</h2></Route>
                            <Route path={"/channel/:channelId"}> <Chat/></Route>
                        </Switch>
                    </div>
                </>
                }

            </div>
        </Router>
    );
}

export default App;
