import React, {useEffect} from 'react';
import s from './users.module.css'
import Preloader from "../../common/Preloader/Preloader";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User/User";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {UsersSearchForm} from "./UsersSearchForm";

type PropsType = {}

const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount),
        currentPage = useSelector(getCurrentPage),
        pageSize = useSelector(getPageSize),
        dispatch = useDispatch(),
        filter = useSelector(getFilter),
        isFetching = useSelector(getIsFetching),
        users = useSelector(getUsers),
        followingInProgress = useSelector(getFollowingInProgress),

    onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    },
        onFilterChanged = (filter: FilterType) => {
            dispatch(requestUsers(1, pageSize, filter))
        },
    followFn = (userId: number) => {
        dispatch(follow(userId))
    },
    unfollowFn = (userId: number) => {
        dispatch(unfollow(userId))
    };

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    return (
        <>
         <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <div className={s.usersContainer}>
            {isFetching ? <Preloader/> : <></>}
            <Paginator totalItemsCount={totalUsersCount} currentPage={currentPage} pageSize={pageSize}
                       onPageChanged={onPageChanged} portionSize={15}/>
            {users.map(user => <User user={user}
                                     followingInProgress={followingInProgress}
                                     follow={followFn}
                                     unfollow={unfollowFn}
                                     key={user.id}
            />)}
        </div>
            </>
    )
};

export default Users;