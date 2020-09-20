import {
    addMessageToSpam,
    deleteMessageForOwner,
    getMessagesNewerThenLast,
    init,
    restoreMessage,
    sendMessage,
    dialogsReducerActionCreators,
    updateDialog, DialogsInitialStateType
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import React from 'react'
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {DialogMessage} from "../../types/types";

type OwnPropsType = {
    init: (id: string) => void,
    userId: string,
    updateDialog: (id: string) => void,
    setCurrentDialog: (data: string | null) => void,
    dialogsPage: DialogsInitialStateType,
    sendMessage: (id: string, message: string) => void,
    addMessageToSpam: (id: string) => void,
    restoreMessage: (id: string) => void,
    deleteMessageForOwner: (id: string) => void,
    ownerId: number,
    oneMessage: DialogMessage,
    currentDialogMessagesCount: number,
    newMessagessCount: number | string,
}

class DialogsContainer extends React.Component<OwnPropsType> {
    componentDidMount() {
        this.props.init(this.props.userId);
    }

    componentDidUpdate(prevProps: any, prevStateoobje: any) {
        if (prevProps.userId != this.props.userId) {
            this.props.updateDialog(this.props.userId);
        }
    }

    componentWillUnmount() {
        this.props.setCurrentDialog(null);
    }

    render() {
        return <Dialogs {...this.props} />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        ownerId: state.auth.userId,
        currentDialogMessagesCount: state.dialogsPage.currentDialogMessagesCount
    }
};

const mapDispatchToProps = {
    init,
    updateDialog,
    sendMessage,
    getMessagesNewerThenLast,
    setCurrentDialog: dialogsReducerActionCreators.setCurrentDialog,
    deleteMessageForOwner,
    restoreMessage,
    addMessageToSpam
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(DialogsContainer);

