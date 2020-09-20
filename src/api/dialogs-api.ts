import {DialogMessage, DialogType} from "../types/types";
import {CommonResponseType, instance} from "./api";

type GetMessagesResponseType = {
    error: null | string
    items: Array<DialogMessage>
    totalCount: number
}
export const dialogsAPI = {
    getDialogs() {
        return instance.get<Array<DialogType>>("dialogs").then(res => res.data)
    },
    startDialog(userId: number) {
        return instance.put<CommonResponseType>(`dialogs/${userId}`).then(res => res.data)
    },
    getMessages(userId: number) {
        return instance.get<GetMessagesResponseType>(`dialogs/${userId}/messages`).then(res => {
                return {
                    messages: res.data.items,
                    totalCount: res.data.totalCount
                }
            }
        )
    },
    sendMessage(userId: number, body: string) {
        return instance.post<CommonResponseType>(`dialogs/${userId}/messages`, {body}).then(res => res.data)
    },
    getNewMessagesCount() {
        return instance.get<number>('dialogs/messages/new/count')
            .then(res => res.data);
    },
    getMessagesNewerThenLast(userId: number, date: string) {
        return instance.get<Array<DialogMessage>>(`dialogs/${userId}/messages/new?newerThen=${date}`)
            .then(res => res.data);
    },
    /*
    checkOnViewed(messageId: string) {
        return instance.get(`dialogs/messages/${messageId}/viewed`).then(res => res.data);
    },*/
    deleteMessageForOwner(messageId: string) {
        return instance.delete<CommonResponseType>(`dialogs/messages/${messageId}`)
            .then(res => res.data);
    },
    restoreMessage(messageId: string) {
        return instance.put<CommonResponseType>(`dialogs/messages/${messageId}/restore`)
            .then(res => res.data);
    },
    addToSpam(messageId: string) {
        return instance.post<CommonResponseType>(`dialogs/messages/${messageId}/spam`)
            .then(res => res.data);
    },
};