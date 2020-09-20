import React from 'react';
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType & RouteComponentProps>{

    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    withRouter,
    connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {getAuthUserData, logout}))(HeaderContainer);