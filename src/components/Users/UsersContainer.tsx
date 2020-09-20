import React from 'react';
import Users from "./Users";
import {
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
    getUsers
} from "../../redux/users-selectors";
import Preloader from "../../common/Preloader/Preloader";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    };

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
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
    }
};

export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
            follow,
            unfollow,
            requestUsers,
        }
    ),
    /*withAuthRedirect*/
)(UsersContainer);