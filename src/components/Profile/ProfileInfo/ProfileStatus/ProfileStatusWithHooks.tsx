import React, {useState, useEffect, ChangeEvent} from 'react';
import s from './ProfileStatus.module.css'
import cn from 'classnames'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditMode(false);
        props.updateStatus(e.currentTarget.value);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };


    if (props.isOwner) return (
        <div className={s.container}>
            {editMode ? <div>
                    <input className={s.input} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div> :
                <div onDoubleClick={activateEditMode} className={cn(s.divStatus, s.divStatusOwner)}>
                    <span >{props.status || ""}</span>
                </div>}
        </div>
    );
    return <div className={s.container}>
        <div className={s.divStatus}>
            <span>{props.status || ""}</span>
        </div>
    </div>

};

export default ProfileStatusWithHooks;