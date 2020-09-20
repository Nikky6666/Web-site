import React from 'react';
import Contact from "./Contact/Contact";
import instagram from '../../../../assets/images/instagram.png'
import vk from '../../../../assets/images/vk.png'
import fasebook from '../../../../assets/images/facebook.png'
import twitter from '../../../../assets/images/twitter.png'
import website from '../../../../assets/images/website.png'
import youtube from '../../../../assets/images/video.png'
import github from '../../../../assets/images/github.png'
import mainLink from '../../../../assets/images/mainLink.png'
import s from './Contacts.module.css'
import {ContactsType} from "../../../../types/types";
const imagesContacts = [fasebook, website, vk, twitter, instagram, youtube, github, mainLink];

type PropsType = {
    contacts: ContactsType
}

type ParsedContactType = Array<string>


const Contacts: React.FC<PropsType> = (props) => {
    const contacts = Object.entries(props.contacts) as Array<ParsedContactType>;
/*    debugger;*/
    const filteredContacts = contacts.map((c, i) => {
        c[2] = imagesContacts[i];
        return c
    }).filter(c => c[1]);
    return <div className={s.container}>
        {filteredContacts.length>0 ?
            <div>
                <h2>Contacts</h2>
                <div className={s.contacts}>
                {filteredContacts.map(c => <Contact key={c[0]} src={c[2]} name={c[0]} link={c[1]}/>)}
                </div>
            </div> : "no contacts"
        }</div>
};

export default Contacts;