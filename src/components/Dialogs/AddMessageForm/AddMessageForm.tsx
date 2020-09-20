import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import s from "../Dialogs.module.css";
import {BigButton} from "../../common/Buttons/Buttons";
import {AddMessageFormValuesType} from "../Dialogs";


//const maxLength50 = maxLengthCreator(50);

type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit} style={{width: '100%'}}>
        {createField<keyof AddMessageFormValuesType>(
            'Ваше сообщение',
            'newMessageBody',
            [required],
            Textarea,
            s.test,
            {},
            ''
        )}
        <div>
            <BigButton name="SEND"/>
        </div>
    </form>
};

 const AddMessageReduxForm = reduxForm<AddMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm);

 export default AddMessageReduxForm