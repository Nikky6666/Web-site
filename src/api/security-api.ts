import {instance} from "./api";

type GetCaptchaURLResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.delete<GetCaptchaURLResponseType>("security/get-captcha-url")
            .then(res => {
                return res.data
            })
    },
};