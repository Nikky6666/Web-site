import React from 'react';
import s from './Login.module.css'
import sform from '../../common/FormsControls/FormsControls.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {BigButton} from "../common/Buttons/Buttons";
import {AppStateType} from "../../redux/redux-store";


type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return<form onSubmit={props.handleSubmit} className={s.loginForm}>
        {createField<LoginFormValuesKeysType>("Email","email", [required],Input,undefined,{className: s.input},null)}
        {createField<LoginFormValuesKeysType>("Password...","password",[required],Input,undefined,{className: s.input, type: "password"},null)}
        {createField<LoginFormValuesKeysType>(undefined,"rememberMe",[] ,"input",
            s.rememberMe,{type: "checkbox", className: s.checkbox},"remember me")}
        {props.captchaUrl && <div>
            <img src={props.captchaUrl} alt="captcha"/>
            {createField<LoginFormValuesKeysType>("Key...","captcha",[required],Input,undefined,{className: s.input},null)}
        </div>}
        {props.error && <div className={sform.formSummaryError}>{props.error}</div>}
        <BigButton name="Submit"/>
    </form>
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesKeysType = keyof LoginFormValuesType;


const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        const {email, password, rememberMe, captcha} = formData;
        props.login(email, password, rememberMe, captcha);
    };
    if(props.isAuth) return <Redirect to={"/profile"} />;
    return<div className={s.container}>
        <h1>LOGIN</h1>
        <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
};
const mapStateToProps = (state: AppStateType): MapStatePropsType =>({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect( mapStateToProps, {login})(Login);