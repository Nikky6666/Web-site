import React from "react"
import s from "./ProfileDataForm.module.css";
import {SmallButton} from "../../../common/Buttons/Buttons";
import {createField, GetStringKeys, Input} from "../../../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../../utils/validators/validators";
import sform from "../../../../common/FormsControls/FormsControls.module.css";
import {ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileDataValuesType = GetStringKeys<ProfileType>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({profile, handleSubmit, error}) => {
    const contacts = Object.entries(profile.contacts);
    return  <form className={s.containerForm} onSubmit={handleSubmit}>
        {error && <div className={sform.formSummaryError}>{error}</div>}
            <table className={s.table}>
                <tr>
                    <th> Full name:</th>
                    <td>{createField<ProfileDataValuesType>("Full name...", "fullName", [required], Input, s.inputDiv, {className: s.input}, null)}</td>
                </tr>
                <tr>
                    <th>Looking for a job:</th>
                    <td>{createField<ProfileDataValuesType>('', "lookingForAJob", [], "input", '',
                        {type: "checkbox", className: s.checkbox}, null)}</td>
                </tr>
                <tr>
                    <th>My professional skills:</th>
                    <td>{createField<ProfileDataValuesType>("Skills...", "lookingForAJobDescription", [], Input, s.inputDiv, {className: s.input}, null)}</td>
                </tr>
                <tr>
                    <th>About me:</th>
                    <td> {createField<ProfileDataValuesType>("About me...", "aboutMe", [], Input, s.inputDiv, {className: s.input}, null)}</td>
                </tr>
                <tr >
                    <th colSpan={2} className={s.contacts}>
                        Contacts
                    </th>
                </tr>
                {contacts.map(c =><tr key={c[0]}>
                    <th>
                        {c[0]}
                    </th>
                    <td>
                        {createField(c[0], "contacts."+c[0], [], Input, s.inputDiv, {className: s.input}, null)}
                    </td>
                </tr>)}
                <tr className={s.buttons}>
                    <td>
                        <SmallButton name="save"/>
                    </td>
                    <td>
                        <SmallButton name="cancel"/>
                    </td>
                </tr>
            </table>
        </form>


};

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'profile-data'})(ProfileDataForm);

export default ProfileDataReduxForm;