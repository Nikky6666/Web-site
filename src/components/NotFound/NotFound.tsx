import React from 'react';
import notFoundPhoto from '../../assets/images/404NotFound.jpg'
import s from './NotFound.module.css'

const NotFound: React.FC = () =>{
    return <div className={s.container}><img className={s.img} src={notFoundPhoto} alt="404 not found" /></div>
};

export default NotFound;