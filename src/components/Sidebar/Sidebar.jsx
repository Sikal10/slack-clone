import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SidebarOptions from "./SidebarOptions/SidebarOptions";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import {db} from "../../firebase";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";

const Sidebar = () => {

    const user = useSelector(selectUser);
    const {uid, photo, displayName, email} = user;
    const [channels, setChannels]  = useState([]);

    useEffect(() => {
        db.collection("channels").onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.data().name
                }
            }))
        ))
    }, [])

    return (
        <div className={"sidebar"}>
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>{displayName}</h2>
                    <h3><FiberManualRecordIcon className={"sidebar__icon"} /> {displayName.split(" ")[0]}</h3>
                </div>
                <CreateIcon />
            </div>

            <SidebarOptions Icon={InsertCommentIcon} title={"Comments"} />
            <SidebarOptions Icon={InboxIcon} title={"Mentions & reactions"} />
            <SidebarOptions Icon={DraftsIcon} title={"Saved items"} />
            <SidebarOptions Icon={BookmarkBorderIcon} title={"Channel browser"} />
            <SidebarOptions Icon={PeopleAltIcon} title={"People & user groups"} />
            <SidebarOptions Icon={AppsIcon} title={"Apps"} />
            <SidebarOptions Icon={FileCopyIcon} title={"File browser"} />
            <SidebarOptions Icon={ExpandLessIcon} title={"Show less"} />
            <hr/>
            <SidebarOptions Icon={ExpandMoreIcon} title={"Channels"} />
            <hr/>
            <SidebarOptions Icon={AddIcon} addChannelOption title={"Add channel"}  />

            {channels.map(channel => <SidebarOptions key={channel.id}  title={channel.name} id={channel.id} />)}

        </div>
    );
};

export default Sidebar;