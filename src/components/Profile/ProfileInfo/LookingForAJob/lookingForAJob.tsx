import React from 'react';
import s from './LookingForAJob.module.css'
import lookJobPhoto from '../../../../assets/images/jobPhoto.jpg'
import cn from 'classnames'

type PropsType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

const LookingForAJob: React.FC<PropsType> = (props) => {
    return <div className={s.lookingForAJob}>
        <div className={s.status}>
            <img src={lookJobPhoto} alt=""/>
            <div className={cn(s.lookingStatus, props.lookingForAJob ? s.look:s.dontLook)}>{props.lookingForAJob ? "Look job" : "Don't look job"}</div>
        </div>
        {props.lookingForAJob && <div className={s.description}>
            <div>Professional skills:</div>
            <div>{props.lookingForAJobDescription}</div>
        </div>}
    </div>
};

export default LookingForAJob;