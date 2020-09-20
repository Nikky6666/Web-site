import React, {ChangeEvent} from 'react';
import s from './ProfileStatus.module.css'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(this.props.status!==prevProps.status){
            this.setState({
                status: this.state.status
                })
        }
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange= (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    };

    render() {
        return (
            <div className={s.container}>
                {this.state.editMode ? <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>:
                    <div className={s.divStatus}>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status||"---"}</span>
                </div>}
            </div>
        );
    }
}

export default ProfileStatus;