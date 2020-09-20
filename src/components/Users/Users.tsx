import React from 'react';
import s from './users.module.css'
import Preloader from "../../common/Preloader/Preloader";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User/User";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    currentPage: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    isFetching: boolean
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({
                                        totalUsersCount,
                                        currentPage,
                                        pageSize,
                                        onPageChanged,
                                        isFetching,
                                        users,
                                        ...props
                                    }) => {
    return (
        <div className={s.usersContainer}>
            {isFetching ? <Preloader/> : <></>}
            <Paginator totalItemsCount={totalUsersCount} currentPage={currentPage} pageSize={pageSize}
                       onPageChanged={onPageChanged} portionSize={15}/>
            {users.map(user => <User user={user}
                                     followingInProgress={props.followingInProgress}
                                     follow={props.follow}
                                     unfollow={props.unfollow}
                                     key={user.id}
            />)}
        </div>
    )
};

export default Users;