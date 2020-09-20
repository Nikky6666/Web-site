import React from "react";
import s from "./FormsControls.module.css"
import {Field, WrappedFieldInputProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../utils/validators/validators";



export const FormControl: React.FC<WrappedFieldProps> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return <div className={`${s.formControl} ${(hasError ? s.error : "")}`}>
        {children}
        {hasError && <div className={s.messageError}>
            {error}
        </div>}
    </div>
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export function createField <FormKeysType extends string>  (
    placeholder: string | undefined,
    name: FormKeysType,
    validate: Array<FieldValidatorType>,
    component: string | React.FC<WrappedFieldProps>,
    classForDiv?: string | undefined,
    props = {},
    text = "" as string | null
){
    return (
        <div className={classForDiv}>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validate}
                component={component}
                {...props}/>
            {text}
        </div>
    );
}

export type GetStringKeys<T> = keyof T;