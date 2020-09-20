import React from 'react';
import s from './Friends.module.css'
import {FriendSidebarType} from "../../../types/types";

type FriendPropsType = {
    friend: FriendSidebarType
}

const Friend: React.FC<FriendPropsType> = (props) => {
  return (
      <div className={s.friend}>
          <img src={props.friend.img} alt="ava"/>
          <div>{props.friend.name}</div>
      </div>
  )
};


type FriendsPropsType = {
    friends: Array<FriendSidebarType>
}
const Friends: React.FC<FriendsPropsType> = (props) => {

    const friendsElements = props.friends.map(
        friend => <Friend key={friend.name} friend={friend}/>
    );

    return (
        <div className={s.container}>
          <div className={s.header}>Friends</div>
      <div className={s.friends}>
          {friendsElements}
      </div>
        </div>
    )
};

export default Friends;