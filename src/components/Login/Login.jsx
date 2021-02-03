import React from 'react';
import "./Login.css";
import Button from "@material-ui/core/Button";
import {auth, provider} from "../../firebase";

const image = "https://join.preciate.com/hs-fs/hubfs/slack%20logo%20-%20500x500%20px%20copy.png?width=500&height=500&name=slack%20logo%20-%20500x500%20px%20copy.png"

const Login = () => {

    const signIn = async () => {
        try {
            await auth.signInWithPopup(provider);
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className={"login"}>
            <div className="login__container">
                <img src={image} alt="text"/>
                <h1>Sign in to Slack</h1>
                <p>Continue with your Google account to sign in.</p>
                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    );
};

export default Login;