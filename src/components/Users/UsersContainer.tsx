import React from 'react';
import Users from "./Users";
import {
    FilterType,
    follow, requestUsers,
    unfollow
} from "../../redux/users-reducer";
/*import {withAuthRedirect} from "../../hoc/withAuthRedirect";*/
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getFilter
} from "../../redux/users-selectors";
import Preloader from "../../common/Preloader/Preloader";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import { UsersSearchForm } from './UsersSearchForm';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.requestUsers(pageNumber, pageSize, filter);
    };

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.requestUsers(1, pageSize, filter)
    }

    render() {
        return <>
            <UsersSearchForm onFilterChanged={this.onFilterChanged} />
            {
                this.props.isFetching
                    ?
                    <Preloader/>
                    :
                    null
            }
            <Users
                {...this.props}
                onPageChanged={this.onPageChanged}/></>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getFilter(state)
    }
};

export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
            follow,
            unfollow,
            requestUsers
        }
    ),
    /*withAuthRedirect*/
)(UsersContainer);