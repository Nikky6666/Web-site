import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {ActionsTypes, BaseThunkType} from "./redux-store";
import {userAPI} from "../api/users-api";
import {CommonResponseType} from "../api/api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of urers ids
    filter: {
        term: '',
        friend: null as null | boolean,
    }
};

export type UsersReducerInitStateType = typeof initialState;

const usersReducer = (state = initialState, action: UsersReducerActionsTypes): UsersReducerInitStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case 'SN/USERS/SET_USERS':
            return {...state, users: [...action.users]};

        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};

        case 'SN/USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};

        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case "SN/USERS/SET_FILTER":{
            return {
                ...state,
                filter: action.payload
            }
        }

        case 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS': {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }

};

export default usersReducer;

type UsersReducerActionsTypes = ActionsTypes<typeof usersReducerActionCreators>

type DispatchType = Dispatch<UsersReducerActionsTypes>
type ThunkType = BaseThunkType<UsersReducerActionsTypes>;

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(usersReducerActionCreators.toggleIsFetching(true));
        dispatch(usersReducerActionCreators.setFilter(filter))
        let data = await userAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(usersReducerActionCreators.toggleIsFetching(false));
        dispatch(usersReducerActionCreators.setUsers(data.items));
        dispatch(usersReducerActionCreators.setCurrentPage(page));
        dispatch(usersReducerActionCreators.setTotalUsersCount(data.totalCount));
    }
};

const _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: (userId: number) => Promise<CommonResponseType>,
    actionCreator: (userId: number) => any
) => {
    dispatch(usersReducerActionCreators.toggleFollowingInProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) dispatch(actionCreator(userId));
    dispatch(usersReducerActionCreators.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
      await  _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), usersReducerActionCreators.followSuccess);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
      await  _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), usersReducerActionCreators.unfollowSuccess);
    }
};


export const usersReducerActionCreators = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS',
        isFetching,
        userId
    } as const)
};

export type FilterType = typeof initialState.filter;