import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

type PropsType = {
    newMessagesCount: number
}

const linksArr = [
    {name: 'Profile', to: 'profile', isNeedCount: false},
    {name: 'Messages', to: 'dialogs', isNeedCount: true},
    {name: 'Users', to: 'users', isNeedCount: false},
    {name: 'News', to: 'news', isNeedCount: false},
    {name: 'Musik', to: 'musik', isNeedCount: false},
    {name: 'Settings', to: 'settings', isNeedCount: false},
    {name: 'Tests', to: 'test', isNeedCount: false},
];

const Navbar = (props: PropsType) => {
    return (
        <nav className={s.nav}>
            {linksArr.map((el, i) => (
                <NavLink key={i} to={`/${el.to}`}  activeClassName={s.activeLink}>
                    <div className={s.item}>
                        {el.name}
                        {el.isNeedCount &&
                        props.newMessagesCount>0 &&
                        <div className={s.newMessagesCount}>{props.newMessagesCount}</div>
                        }
                    </div>
                </NavLink>
                )
            )}
            <FriendsContainer/>
        </nav>
    )
};

export default Navbar;