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
import {FilterType, follow, requestUsers, unfollow, usersReducerActionCreators} from "../../redux/users-reducer";
import {UsersSearchForm} from "./UsersSearchForm";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {};
type QueryParamsType = { term?: string; page?: string; friend?: string };

const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount),
        currentPage = useSelector(getCurrentPage),
        pageSize = useSelector(getPageSize),
        dispatch = useDispatch(),
        filter = useSelector(getFilter),
        isFetching = useSelector(getIsFetching),
        users = useSelector(getUsers),
        followingInProgress = useSelector(getFollowingInProgress),
        history = useHistory(),

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
        //debugger
        const query: QueryParamsType = {};
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter.friend, filter.term, currentPage])

    useEffect(() => {
        let parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
        let actualPage = currentPage, actualFilter = filter;

        if(parsed.page) actualPage = Number(parsed.page)
        if(parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        if(parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'}

       // dispatch(requestUsers(actualPage, pageSize, actualFilter))
        if(isFetching) {
            dispatch(usersReducerActionCreators.setFilter(actualFilter));
            dispatch(usersReducerActionCreators.setCurrentPage(actualPage))
        } else {
            dispatch(requestUsers(actualPage, pageSize, actualFilter))
        }

    }, [filter.friend, filter.term, currentPage])



    return (
        <>
         <UsersSearchForm filter={filter} onFilterChanged={onFilterChanged}/>
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