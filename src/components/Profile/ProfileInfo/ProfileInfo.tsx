import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'
import {AddFileButton, BigButton, SmallButton} from "../../common/Buttons/Buttons";
import AboutMe from "./AboutMe/AboutMe";
import LookingForAJob from "./LookingForAJob/lookingForAJob";
import Contacts from "./Contacts/Contacts";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import {NavLink} from "react-router-dom";
import {ProfileType} from "../../../types/types";
import {AxiosPromise} from "axios";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    isOwner: boolean
    savePhoto: (e: any)=>void
    status: string
    updateStatus: (status: string) => void
    saveProfile: (dataForm: any) => Promise<AxiosPromise>;
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, isOwner, savePhoto, status, updateStatus, saveProfile}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

  const onSubmit = (dataForm: ProfileType) => {
      saveProfile(dataForm).then(()=>{
          //console.log("END")
          setEditMode(false);
      });
  };


    return (<div className={s.container}>
                <div className={s.image}>
                    <img src={profile.photos.large || userPhoto} alt="" className={s.userPhoto}/>
                    {isOwner ? <AddFileButton name={'Выбрать аватар'} callback={onMainPhotoSelected}/> : <NavLink to={`dialogs/${profile.userId}`}><BigButton name="Send message"/></NavLink>}
                </div>
                {
                    // @ts-ignore
                    editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData goToEditMode={()=>{setEditMode(true)}} profile={profile} isOwner={isOwner} status={status} updateStatus={updateStatus}/>}
            </div>
    );
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> =
    ({profile, isOwner, status, updateStatus, goToEditMode}) => {
    return <div className={s.desctiptionBlock}>
        <div className={s.fullName}>
            <h1>{profile.fullName}</h1>
            {isOwner && <SmallButton callback={goToEditMode} className={s.buttonEditMode} name="Edit"/>}
        </div>
        <ProfileStatusWithHooks isOwner={isOwner} status={status} updateStatus={updateStatus}/>
        <AboutMe aboutMe={profile.aboutMe}/>
        <LookingForAJob lookingForAJob={profile.lookingForAJob}
                        lookingForAJobDescription={profile.lookingForAJobDescription}/>
        <Contacts contacts={profile.contacts}/>
    </div>
};



export default ProfileInfo;