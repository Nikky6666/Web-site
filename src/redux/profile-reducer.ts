import {ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes, AppStateType, BaseThunkType} from "./redux-store";
import {profileAPI} from "../api/profile-api";


let initialState = {
    postsData: [
        {
            id: 0,
            message: 'Hi, how are you',
            likesCount: 5,
            img: "https://yt3.ggpht.com/a/AGF-l78XZgyutXUlON-U4sTy-EwaZoBJXrqGvQ2kxg=s900-c-k-c0xffffffff-no-rj-mo"
        },
        {
            id: 1,
            message: 'It\'s my first post',
            likesCount: 20,
            img: "https://yt3.ggpht.com/a/AGF-l78XZgyutXUlON-U4sTy-EwaZoBJXrqGvQ2kxg=s900-c-k-c0xffffffff-no-rj-mo"
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};


const profileReducer = (state = initialState, action: ProfileReducerActionsTypes): ProfileReducerInitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: state.postsData.length,
                message: action.newPostText,
                likesCount: 0,
                img: "https://yt3.ggpht.com/a/AGF-l78XZgyutXUlON-U4sTy-EwaZoBJXrqGvQ2kxg=s900-c-k-c0xffffffff-no-rj-mo"
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        case 'SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            };
        case 'SET_STATUS':
            return {
                ...state, status: action.status
            };
        case 'DELETE_POST':
            return {
                ...state, postsData: state.postsData.filter(post => post.id.toString() !== action.postId)
            };
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            };
        case 'UPDATE_POST':
            return {
                ...state, postsData: state.postsData.map(p => {
                    if (p.id.toString() === action.postId) return {...p, message: action.message};
                    else return p;
                })
            };
        default:
            return state;
    }

};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(profileReducerActionCreators.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let status = await profileAPI.getStatus(userId);
    dispatch(profileReducerActionCreators.setStatus(status))

};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCodesEnum.Success) dispatch(profileReducerActionCreators.setStatus(status))
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.resultCode === ResultCodesEnum.Success) dispatch(profileReducerActionCreators
        .sevePhotoSuccess(response.data.photos))
};
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);
    /*  debugger;*/
    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId !== null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }
    }  else {
            let message: string | string[] = data.messages.length > 0 ? data.messages[0] : "Some error";
            if (message !== "Some error") {
                message = message.split("->");
                message = message[1].toLocaleLowerCase();
                message = message.slice(0, message.length - 1);
                dispatch(stopSubmit("profile-data", {
                        "contacts": {[message]: data.messages[0]}
                    })
                );
            } else {
                dispatch(stopSubmit("profile-data", {_error: message}));
            }
        return Promise.reject(data.messages[0]);
    }

};

export default profileReducer;

export const profileReducerActionCreators = {
    addPost: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    deletePost: (postId: string | number) => ({type: 'DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    sevePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
    updatePost: (postId: number | string, message: string) =>
        ({type: 'UPDATE_POST', postId, message} as const),
};

type ProfileReducerActionsTypes = ActionsTypes<typeof profileReducerActionCreators>
type ThunkType = BaseThunkType<ProfileReducerActionsTypes | FormAction>;
export type ProfileReducerInitialStateType = typeof initialState

