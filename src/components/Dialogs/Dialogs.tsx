import React from 'react'
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {PagesButton} from "../common/Buttons/Buttons";
import {Route} from "react-router-dom";
import {DialogsInitialStateType} from "../../redux/dialogs-reducer";
import {DialogMessage} from "../../types/types";
import AddMessageReduxForm from "./AddMessageForm/AddMessageForm";

type OwnPropsType = {
    dialogsPage: DialogsInitialStateType,
    sendMessage: (id: string, message: string) => void,
    addMessageToSpam: (id: string) => void,
    restoreMessage: (id: string) => void,
    deleteMessageForOwner: (id: string) => void,
    ownerId: number,
    userId: string,
    oneMessage: DialogMessage,
    currentDialogMessagesCount: number,
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(user => <DialogItem key={user.id} user={user}/>);
    let messageElements = state.messages.map(oneMessage => (
        <Message
            addMessageToSpam={props.addMessageToSpam}
            restoreMessage={props.restoreMessage}
            deletedMessages={state.deletedMessages}
            deleteMessageForOwner={props.deleteMessageForOwner}
            ownerId={props.ownerId}
            key={oneMessage.id}
            oneMessage={oneMessage}/>
            ));

    const MessagesComponent = () => <div className={s.containerMessages}>
        <div className={s.buttonPrevMes}>
            <PagesButton isVisible={props.currentDialogMessagesCount > state.messages.length}
                         name="show prev messages"/>
        </div>
        {messageElements}
    </div>;

    const addNewMessage = (value: any) => {
        if (value.newMessageBody) props.sendMessage(props.userId, value.newMessageBody);
    };
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {state.selectedDialogId===null && <div className={s.messageToSelectDialog}>Please select dialog</div>}
                {state.selectedDialogId!==null && <Route
                    path={`/dialogs/${state.selectedDialogId}`} render={()=><MessagesComponent/>}/>}
            </div>
            {state.selectedDialogId!==null && <AddMessageReduxForm onSubmit={addNewMessage}/>}
        </div>
    )
};

export default Dialogs;


export type AddMessageFormValuesType = {
    newMessageBody: string
}

