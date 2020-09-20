import React from 'react';
import s from './Contact.module.css'

type PropsType = {
    src: string
    name: string
    link: string
}

const Contact: React.FC<PropsType> = (props) => {
    return <div className={s.contact}><a href={props.link}><img title={props.name} src={props.src} alt=""/></a></div>
};

export default Contact