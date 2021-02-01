import React from 'react';
import "./Header.css"
import Avatar from "@material-ui/core/Avatar";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Header = () => {
    return (
        <div className={"header"}>
            <div className="header__left">
                <Avatar />
                <AccessTimeIcon />
            </div>

            <div className="header__center">
                <SearchIcon />
                <input placeholder="Search Slack"/>
            </div>

            <div className="header__right">
                <HelpOutlineIcon />
            </div>
        </div>
    );
};

export default Header;