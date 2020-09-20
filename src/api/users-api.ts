import {UserType} from "../types/types";
import {instance, ResponseType} from "./api";

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
};
export const userAPI = {
    getUsers(currentPage: number, pageSize: number, term?: string, friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(
            `users?page=${currentPage}&count=${pageSize}${!!term ? `&term=${term}` : ''}${friend === null ? '' : `&friend=${friend}`}`
        )
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(response => response.data)
    },
};