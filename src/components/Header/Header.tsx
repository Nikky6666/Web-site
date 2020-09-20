import React from 'react';
import s from './Header.module.css';
import {BigButton} from "../common/Buttons/Buttons";
import logo from '../../assets/images/logoSite.png'
import {RouteComponentProps} from "react-router-dom";


export type MapPropsType = {
    login: null | string
    isAuth: boolean
}
export type DispatchPropsType = {
    logout: ()=>void
    getAuthUserData: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType & RouteComponentProps> = (props) => {
    return (
        <header className={s.header}>
            <img
                src={logo}
                alt=""/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} <BigButton name="Logout" callback={props.logout}/></div> :
                    <BigButton callback={()=>{props.history.push("/login")}} name="Sign In"/>}
            </div>
        </header>
    );
};

export default Header;