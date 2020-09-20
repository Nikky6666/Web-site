import {instance, ResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type MeResponseType = {
        id: number,
        email: string,
        login: string,
};
type LoginResponseType = {
        userId: number
}
export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType>>("auth/me")
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodeForCaptcha | ResultCodesEnum>>("auth/login", {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logout() {
        return instance.delete<ResponseType>("auth/login").then(response => response.data);
    },
};