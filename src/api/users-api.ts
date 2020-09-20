import {UserType} from "../types/types";
import {instance, ResponseType} from "./api";

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
};
export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
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