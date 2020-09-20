
import {profileReducerActionCreators} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
};

const mapDispatchToProps = {
    addPost:profileReducerActionCreators.addPost,
    deletePost: profileReducerActionCreators.deletePost,
    updatePost: profileReducerActionCreators.updatePost
}

type mapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    deletePost: (id: number) => void
    updatePost: (id: number, message: string) => void
}

type MyPostsPropsType = {}
export default connect<ReturnType<typeof mapStateToProps>, mapDispatchToPropsType, MyPostsPropsType,
    AppStateType
    >(mapStateToProps, mapDispatchToProps)(MyPosts);


