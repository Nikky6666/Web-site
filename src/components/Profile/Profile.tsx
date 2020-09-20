import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";
import {AxiosPromise} from "axios";

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    savePhoto: (e: any)=>void
    status: string
    updateStatus: (status: string) => void
    saveProfile: (dataForm: any) => Promise<AxiosPromise>;
}

const Profile: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    return (
      <div>
      <ProfileInfo saveProfile={saveProfile} savePhoto={savePhoto} isOwner={isOwner} profile={profile} status={status} updateStatus={updateStatus}/>
      <MyPostsContainer/>
    </div>
    )
};

export default Profile;
