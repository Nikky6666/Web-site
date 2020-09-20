import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import MyPostsForm, {AddPostFormValuesType} from "./AddPostFom/AddPostForm";
import {PostType} from "../../../types/types";


export type PropsType = {
    postsData: Array<PostType>,
    addPost: (newPostText: string) => void
    deletePost: (id: number) => void
    updatePost: (postId: number, message: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {
        let postsElements = props.postsData.map(onePost => <Post
            updatePost={props.updatePost}
            deletePost={props.deletePost}
            key={onePost.message}
            onePost={onePost}/>);
        let onAddPost = (values: AddPostFormValuesType) => {
            if(values.newPostText) props.addPost(values.newPostText);
        };
        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <MyPostsForm onSubmit={onAddPost}/>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        )
    };
export default MyPosts;
