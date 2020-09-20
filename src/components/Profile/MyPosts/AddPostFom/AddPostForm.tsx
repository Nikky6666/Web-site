import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../../../common/FormsControls/FormsControls";
import {BigButton} from "../../../common/Buttons/Buttons";
import React from "react";
import {required} from "../../../../utils/validators/validators";

type PropsType = {
}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormKeysType = GetStringKeys<AddPostFormValuesType>

let MyPostsForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>

        {createField<AddPostFormKeysType>(
            'Текст поста...',
            'newPostText',
            [required],
            Textarea,
            '',
            {}
        )}
        <div>
            <BigButton name="ADD POST"/>
        </div>
    </form>
};

export default reduxForm<AddPostFormValuesType, PropsType>({form: "ProfileMyPostsForm"})(MyPostsForm);
