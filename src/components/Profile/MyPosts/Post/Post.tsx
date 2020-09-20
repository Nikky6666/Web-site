import React, {useState} from 'react';
import s from './Post.module.css'
import editPhoto from '../../../../assets/images/edit.png'
import {SmallButton} from "../../../common/Buttons/Buttons";
import {createField, Input} from "../../../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {PostType} from "../../../../types/types";

type PropsType = {
    onePost: PostType
    deletePost: (id: number) => void
    updatePost: (postId: number, message: string) => void
}

const Post: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const onSaveClick = (dataForm: any) => {
        setEditMode(false);
        if(dataForm.post) props.updatePost(props.onePost.id, dataForm.post)
    };

    return (
        <div className={s.content}>
            <div className={s.item}>
                <div><img src={props.onePost.img} alt={props.onePost.message}/></div>
                {editMode ? <PostReduxForm onSubmit={onSaveClick} initialValues={{post: props.onePost.message}}/>:
                <div className={s.textContainer}>
                    <div className={s.text}>{props.onePost.message}</div>
                    <div className={s.rightAbs}>
                        <div>
                        <button onClick={()=>{props.deletePost(props.onePost.id)}}>x</button>
                            <img onClick={()=>{setEditMode(true)}} src={editPhoto} alt=""/>
                        </div>
                        <div className={s.likes}>
                            like <span>{props.onePost.likesCount}</span>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

const PostForm = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        {
            // @ts-ignore*/
            createField("Your text...",`post`,null,Input,s.editContainer,{className: s.textarea},null)}
        <SmallButton name="save"/>
    </form>
};

const PostReduxForm = reduxForm({form: "posts"})(PostForm);

export default Post;

/*
Post.propTypes = {
    onePost: PropTypes.shape({
        likeCounter: PropTypes.number,
        message: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        img: PropTypes.string
    })
}*/
