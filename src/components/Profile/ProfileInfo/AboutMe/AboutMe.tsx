import React from 'react';
import s from './AboutMe.module.css'

type PropsType = {
    aboutMe: string | null
}

const AboutMe: React.FC<PropsType> = (props) => {
 return <div className={s.container}>
     <div className={s.name}>About me:</div>
     <div className={s.description}>{props.aboutMe}</div>
 </div>
};

export default AboutMe;