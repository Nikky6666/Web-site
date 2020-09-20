import React from 'react'
import s from './Message.module.css'
import cn from 'classnames'
import {DeletedDialogMessageType, DialogMessage} from "../../../types/types";

type PropsType = {
    oneMessage: DialogMessage
    ownerId: number
    deletedMessages: Array<DeletedDialogMessageType>
    deleteMessageForOwner: (id: string) => void
    restoreMessage: (id: string) => void
    addMessageToSpam: (id: string) => void
}

const Message: React.FC<PropsType> = (props) => {

    const isDeleted = !!props.deletedMessages.find(m => m.id ===props.oneMessage.id);

    const deleteMessage = () => {
        props.deleteMessageForOwner(props.oneMessage.id);
    };
    const restoreMessage = () => {
        props.restoreMessage(props.oneMessage.id);
    };

    return (<div className={cn(s.wrapper, {[s.notVuived]: !props.oneMessage.viewed})}>
            <div className={cn(s.message,
                {
                    [s.fromUser]: props.ownerId===props.oneMessage.senderId,
                    [s.fromInterlocutor]: props.ownerId!==props.oneMessage.senderId,
                    [s.deletedMessage] : isDeleted
                }
                )}>
                <div className={s.senderName}>{props.oneMessage.senderName}: </div>
                {!isDeleted ? props.oneMessage.body : "message is deleted"}
                <div className={s.buttons}>
                 <span onClick={!isDeleted ? deleteMessage : restoreMessage}>{!isDeleted ? "delete for me":"restore"}</span> | <span  onClick={()=>{props.addMessageToSpam(props.oneMessage.id)}}>spam</span>
            </div>
            </div>
        </div>
     )
};

export default Message;

