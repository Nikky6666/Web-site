import React from 'react';
import s from './Buttons.module.css'
import cn from 'classnames'

type CommonButtonsPropsType = {
    callback?: (e?: any) => void
    name: string
}

export const BigButton: React.FC<CommonButtonsPropsType> = (props) => {
    return <button onClick={props.callback} className={s.button}>{props.name}</button>
};

type SmallButtonPropsType = {
    disabled?: boolean
    className?: string
    callback?: () => void
    name: string
}

export const SmallButton: React.FC<SmallButtonPropsType> = (props) => {
    return <button onClick={props.callback} disabled={props.disabled}
                   className={cn(s.smallButton, {[s.disabled]: props.disabled}, props.className)}>{props.name}</button>
};

type PagesButtonPropsType = {
    isVisible: boolean
}

export const PagesButton: React.FC<CommonButtonsPropsType & PagesButtonPropsType> = (props) => {
    return <button onClick={props.callback}
                   className={cn(s.pagesButton, {[s.notVisible]: !props.isVisible})}>{props.name}</button>
};


export const AddFileButton: React.FC<CommonButtonsPropsType> = (props) => {
    return <div className={s.addFileButton}>
        <label htmlFor="input">{props.name}</label>
        <input onChange={props.callback} type="file" id="input"/>
    </div>
};

