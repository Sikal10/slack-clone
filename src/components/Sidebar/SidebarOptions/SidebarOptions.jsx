import React from 'react';
import "./SidebarOptions.css";
import {useHistory} from "react-router-dom";
import {db} from "../../../firebase";

const SidebarOptions = ({Icon, title, id,  addChannelOption}) => {
    const history = useHistory();

    const addChannel = () => {
        const channelName = prompt("Please enter a channel name");
        if (channelName) {
            db.collection("channels").add({
                name: channelName
            })
        }
    }

    const selectChannel = () => {
        if (id) {
            history.push(`/channel/${id}`)
        } else {
            history.push(title)
        }
    }

    return (
        <div className={"sidebarOption"} onClick={addChannelOption ? addChannel : selectChannel }>
            {Icon && <Icon className={"sidebarOption__icon"} />}
            {Icon ? <h3>{title}</h3> : <h3 className={"sidebarOption__channel"}> <span className={"sidebarOption__hash"}>#</span> {title}</h3>}
        </div>
    );
};

export default SidebarOptions;