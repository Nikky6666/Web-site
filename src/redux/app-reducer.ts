import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes, AppStateType} from "./redux-store";


let initialState = {
    initialized: false,
    globalError: "",
};

const appReducer = (state = initialState, action: AppReducerActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            };
        case 'SET_GLOBAL_ERROR':
            return {
                ...state,
                globalError: action.errorMessage
            };
        default:
            return state;
    }
};


type ThunkType = ThunkAction<void, AppStateType, unknown, AppReducerActionsTypes>;

export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(appReducerActionCreators.initializedSuccess())
    });
};

export const setGlobalErrorOnTime = (errorMessage: string): ThunkType => (dispatch: any) => {
    dispatch(appReducerActionCreators.setGlobalError(errorMessage));
    setTimeout(() => {
        dispatch(appReducerActionCreators.setGlobalError(""));
    }, 5000)
};


export const appReducerActionCreators = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const),
    setGlobalError: (errorMessage: string) => ({type: 'SET_GLOBAL_ERROR', errorMessage} as const),
};

export default appReducer;

type AppReducerActionsTypes = ActionsTypes<typeof appReducerActionCreators>;
export type InitialStateType = typeof initialState;
