import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
};

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {
   //fake: () => void
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>){
    function RedirectComponent(props: MapPropsType & DispatchPropsType) {
        if (!props.isAuth) return <Redirect to="/login"/>;
        let {isAuth, ...restProps} = props;
        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect<
        MapPropsType, DispatchPropsType, WCP, AppStateType
        >(mapStateToPropsForRedirect)(RedirectComponent);
}