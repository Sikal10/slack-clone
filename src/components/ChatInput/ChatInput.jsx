import React, {useState} from 'react';
import "./ChatInput.css";
import {db} from "../../firebase";
import firebase from "firebase";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";

const ChatInput = ({channelName, channelId}) => {
    const user = useSelector(selectUser);
    // console.log(user)
    console.log(channelId)
    console.log(user)
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log("clicked")

        console.log(channelId)
        if (channelId) {
            await db.collection("channels").doc(channelId).collection("messages").add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user?.photo
            });
            setInput("");
        }
    }
    return (
        <div className={"chatInput"}>
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Message #${channelName?.toLowerCase()}`}/>
                <button onClick={sendMessage}>Send</button>
            </form>
        </div>
    );
};

export default ChatInput;