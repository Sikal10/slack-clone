import React, {useEffect, useState} from 'react';
import "./Chat.css";
import {useParams} from "react-router-dom";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {db} from "../../firebase";
import Message from "../Message/Message";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import ChatInput from "../ChatInput/ChatInput";

const Chat = () => {
    const {channelId} = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    // const user = useSelector(selectUser);
    // const {uid, photo, displayName, email} = user;

    useEffect(() => {
        console.log(channelId)
        if (channelId) {
            db.collection("channels").doc(channelId).onSnapshot(snapshot => setRoomDetails(snapshot.data()));
        }

        db.collection("channels").doc(channelId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => (
            setRoomMessages(snapshot.docs.map(doc => doc.data()))
        ))


    }, [channelId])
    console.log(channelId)
    return (
        <div className={"chat"}>
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong># {roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>

                <div className="chat__headerRight">
                    <p> <InfoOutlinedIcon /> Details</p>
                </div>
            </div>

            <div className="chat__messages">
                {roomMessages.map(({message, timestamp, userImage, user}) => <Message timestamp={timestamp} message={message} user={user} userImage={userImage} />)}
            </div>
            {console.log(channelId)}
            <ChatInput channelName={roomDetails?.name} channelId={channelId} />
            {console.log(channelId)}
        </div>
    );
};

export default Chat;