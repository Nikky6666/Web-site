import React from 'react';
import s from './User.module.css'
import uperPhoto from '../../../assets/images/user.png'
import {NavLink} from "react-router-dom";
import {SmallButton} from "../../common/Buttons/Buttons";
import {UserType} from "../../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (<div className={s.user}>
            <div className={s.photoButton}>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img className={s.photo} src={user.photos.small ? user.photos.small : uperPhoto} alt=""/>
                    </NavLink>
                </div>
            </div>
            <div>
                <div className={s.buttons}>
                    {user.followed ?
                        <SmallButton name="Unfollow" disabled={followingInProgress.some(id => id === user.id)}
                                     callback={() => {
                                         unfollow(user.id)
                                     }}
                        /> :
                        <SmallButton name="Follow" disabled={followingInProgress.some(id => id === user.id)}
                                     callback={() => {
                                         follow(user.id)
                                     }}
                        />
                    }</div>
                <NavLink to={`dialogs/${user.id}`}>
                    <SmallButton name="Send message"/>
                </NavLink>
            </div>
            <div className={s.userData}>
                <div className={`${s.columnSpaceBetween} ${s.nameStatus}`}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div className={s.columnSpaceBetween}>
                    <div>{"user.location.city"}</div>
                    <div>{"user.location.country"}</div>
                </div>
            </div>
        </div>
    )
};


export default User;