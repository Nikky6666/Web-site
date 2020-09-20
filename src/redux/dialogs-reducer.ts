import {ResultCodesEnum} from "../api/api";
import {DeletedDialogMessageType, DialogMessage, DialogType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes, AppStateType} from "./redux-store";
import {dialogsAPI} from "../api/dialogs-api";



let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<DialogMessage>,
    selectedDialogId: null as string | null,
    newMessagesCount: 0,
    needRefresh: false,
    currentDialogMessagesCount: 0,
    deletedMessages: [] as Array<DeletedDialogMessageType>,
};

const dialogsReducer = (state = initialState, action: DialogReducerActionsTypes): DialogsInitialStateType => {
    switch (action.type) {

        case 'GET_DIALOGS_SUCCESS':
        case 'SET_CURRENT_DIALOG':
        case 'GET_MESSAGES_SUCCESS':
        case 'SET_NEW_MESSAGES_COUNT':
        case 'SET_NEED_REFRESH':
            // @ts-ignore
            return {
                ...state,
                ...action.payload
            };
        case 'PUT_UP_DIALOG':
            const dialog = state.dialogs.find((d: DialogType) => d.id == action.userId);
            if (dialog) {
                return {
                    ...state,
                    dialogs: [dialog, ...state.dialogs.filter(d => d.id != action.userId)]
                };
            } else {
                return state;
            }
        case 'DELETE_MESSAGE_FOR_OWNER':
            return {
                ...state,
                messages: state.messages.filter(m => m.id !== action.messageId)
            };
        case 'SET_HAS_NEW_MESSAGES':
            return {
                ...state,
                dialogs: state.dialogs.map(d => {
                    // @ts-ignore
                    if (d.id == action.userId) return {...d, hasNewMessages: action.hasNewMessages};
                    else return d
                })

            };
        case 'APPEND_MESSAGES':
            return {
                ...state, messages: [...state.messages, ...action.messages]
            };
        case 'ADD_DELETED_MESSAGES':
            return {
                ...state, deletedMessages: [...state.deletedMessages, action.message]
            };
        case 'RESTORE_MESSAGE':
            return {
                ...state, deletedMessages: state.deletedMessages.filter(m => m.id !== action.messageId)
            };
        case 'ADD_TO_SPAM_SUCCESS':
            return {
                ...state, messages: state.messages.filter(m => m.id !== action.messageId)
            };
        default:
            return state;
    }

};

export const getDialogs = (): ThunkWithPromiseType => async (dispatch) => {
    let dialogs = await dialogsAPI.getDialogs();
    dispatch(dialogsReducerActionCreators.getDialogsSuccess(dialogs));
};

export const sendMessage = (userId: number, body: string): ThunkWithPromiseType => async (dispatch) => {
     await dialogsAPI.sendMessage(userId, body);
    dispatch(dialogsReducerActionCreators.setNeedRefresh(true));
    dispatch(dialogsReducerActionCreators.putUpDialog(userId));
};
export const startDialog = (userId: number) => async (dispatch: any, getState: any) => {
    await dialogsAPI.startDialog(userId);
    let dialog = getState().dialogsPage.dialogs.find((d: any) => d.id == userId);
    if (dialog) {
        dispatch((dialogsReducerActionCreators.putUpDialog(userId)));
    } else {
        dispatch(getDialogs())
    }
};




export const getMessages = (userId: number, needRefresh = false): ThunkWithPromiseType => async (dispatch, getState) => {
    let state = getState();
    let messages = state.dialogsPage.messages;
    if (messages.length > 0 && messages[messages.length - 1].viewed && !needRefresh) {
        /*  dispatch(updateUnviewedMessages())*/
        dispatch(getMessagesNewerThenLast(userId, messages[messages.length - 1].addedAt))
    } else {
        let result = await dialogsAPI.getMessages(userId);

        if (result.messages.some((m: DialogMessage) => !m.viewed)) dispatch(dialogsReducerActionCreators.setNeedRefresh(true));
        dispatch(dialogsReducerActionCreators.getMessagesSuccess(result.messages, result.totalCount));
        dispatch(dialogsReducerActionCreators.setHasNewMessages(userId, false));
    }
};

export const init = (userId: number): ThunkWithPromiseType => async (dispatch) => {
    if (!!userId) {
        dispatch(getMessages(userId));
        dispatch(dialogsReducerActionCreators.setCurrentDialog(userId));
        await dispatch(startDialog(userId));
        dispatch(getDialogs())

    } else {
        dispatch(getDialogs());
    }
};

export const updateDialog = (userId: number): ThunkType => (dispatch) => {
    if (!!userId) {
        dispatch(dialogsReducerActionCreators.setNeedRefresh(true));
        dispatch(getMessages(userId, true));
        dispatch(dialogsReducerActionCreators.setCurrentDialog(userId))
    } else {
        dispatch(dialogsReducerActionCreators.setCurrentDialog(null));
    }
};
export const getNewMessages = (): ThunkWithPromiseType => async (dispatch, getState) => {
    let count = await dialogsAPI.getNewMessagesCount();
    let state = getState();
    if (state.dialogsPage.newMessagesCount !== count || state.dialogsPage.needRefresh) {
        dispatch(dialogsReducerActionCreators.setNewMessagesCount(count));
        dispatch(getDialogs());
        dispatch(dialogsReducerActionCreators.setNeedRefresh(false));
        if (state.dialogsPage.selectedDialogId !== null) {
            dispatch(getMessages(Number(state.dialogsPage.selectedDialogId)));
        }
    }
};

export const deleteMessageForOwner = (messageId: string): ThunkWithPromiseType => async (dispatch, getState) => {
    let res = await dialogsAPI.deleteMessageForOwner(messageId);
    if (res.resultCode === ResultCodesEnum.Success) {
        const restoredInterval = <any>setTimeout(() => {
            dispatch(dialogsReducerActionCreators.deleteMessageForOwnerSuccess(messageId));
        }, 5000);
        dispatch(dialogsReducerActionCreators.addDeletedMessages(messageId, restoredInterval));
    }
};

export const getMessagesNewerThenLast = (userId: number, date: string): ThunkWithPromiseType => async (dispatch, getState) => {
    let messages = await dialogsAPI.getMessagesNewerThenLast(userId, date);
    dispatch(dialogsReducerActionCreators.appendMessages(messages));
};
export const restoreMessage = (messageId: string): ThunkWithPromiseType => async (dispatch, getState) => {
    let res = await dialogsAPI.restoreMessage(messageId);
    if (res.resultCode ===  ResultCodesEnum.Success) {
        const deletedMessages = getState().dialogsPage.deletedMessages;
        const interval = deletedMessages.find((m: any) => m.id === messageId);
        if(interval) clearInterval(interval.restoredInterval);
        dispatch(dialogsReducerActionCreators.restoreMessageSuccess(messageId));
    }
};
export const addMessageToSpam = (messageId: string): ThunkWithPromiseType => async (dispatch, getState) => {
    let res = await dialogsAPI.addToSpam(messageId);
    if (res.resultCode ===  ResultCodesEnum.Success) {
        dispatch(dialogsReducerActionCreators.addToSpamSuccess(messageId));
    }
};


export default dialogsReducer;



type ThunkWithPromiseType = ThunkAction<Promise<void>, AppStateType, unknown, DialogReducerActionsTypes>;
type ThunkType = ThunkAction<void, AppStateType, unknown, DialogReducerActionsTypes>;

export const dialogsReducerActionCreators = {
    setCurrentDialog: (selectedDialogId: number | null) => (
        {
            type: 'SET_CURRENT_DIALOG',
            payload: {
                selectedDialogId
            }
        } as const
    ),
    getMessagesSuccess: (messages: Array<DialogMessage>, currentDialogMessagesCount: number) => (
        {
            type: 'GET_MESSAGES_SUCCESS',
            payload:
                {
                    messages,
                    currentDialogMessagesCount
                }
        } as const
    ),
    putUpDialog: (userId: number) => (
        {
            type: 'PUT_UP_DIALOG',
            userId
        } as const
    ),
    setHasNewMessages: (userId: number, hasNewMessages: boolean) => (
        {
            type: 'SET_HAS_NEW_MESSAGES',
            userId,
            hasNewMessages,
        } as const
    ),
    appendMessages: (messages: Array<DialogMessage>) => (
        {
            type: 'APPEND_MESSAGES',
            messages
        } as const
    ),
    addDeletedMessages: (messageId: string, restoredInterval: number) => (
        {
            type: 'ADD_DELETED_MESSAGES',
            message:
                {id: messageId, restoredInterval}
        } as const
    ),
    restoreMessageSuccess: (messageId: string) => (
        {
            type: 'RESTORE_MESSAGE',
            messageId
        } as const
    ),
    deleteMessageForOwnerSuccess: (messageId: string) => (
        {
            type: 'DELETE_MESSAGE_FOR_OWNER',
            messageId
        } as const
    ),
    addToSpamSuccess: (messageId: string) => (
        {
            type: 'ADD_TO_SPAM_SUCCESS',
            messageId
        } as const
    ),
    getDialogsSuccess: (dialogs: Array<DialogType>) => (
        {
            type: 'GET_DIALOGS_SUCCESS',
            payload: {
                dialogs
            }
        } as const
    ),
    setNewMessagesCount: (newMessagesCount: number) => (
        {
            type: 'SET_NEW_MESSAGES_COUNT',
            payload: {
                newMessagesCount
            }
        }  as const
    ),
    setNeedRefresh: (needRefresh: boolean) => (
        {
            type: 'SET_NEED_REFRESH',
            payload:
                {
                    needRefresh
                }
        }  as const
    ) ,
}

type DialogReducerActionsTypes = ActionsTypes<typeof dialogsReducerActionCreators>;
export type DialogsInitialStateType = typeof initialState;
