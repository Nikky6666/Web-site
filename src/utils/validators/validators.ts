export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return "field is required"
};


export const maxLengthCreator = (length: number): FieldValidatorType => (value) =>{
    if(value && value.length >= length) return `Max length is ${length} symbols`;
    return undefined;
};
