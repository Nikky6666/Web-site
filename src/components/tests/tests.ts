export const bla = 56;

type UserType = {
    firstName: string
    lastName: string
    age: number
}
type PhotoType = {
    large: string
    small: string
}

type CrazyType<T> = T extends 'user' ? UserType
    : T extends  'photo' ? PhotoType : never

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
let a: CrazyType<'user' | 'photo'> = {
    firstName: 'Nikky',
    lastName: 'Borb',
    age: 20
};

let b: CrazyType<'photo'> = {
    large: 'https://nikky.by/1.png',
    small: 'https://nikky.by/2.png',
};

const obj = {
    a: {name: 'Nikky'},
    b: {age: 56},
    c: {site: {title: 'https://lll.by'}},
};

//type ObjKeysType = typeof obj.a | typeof obj.b | typeof obj.c;

type ObjPropertiesType<T> = T extends {[key: string]: infer U} ? U : never

const actions = {
    AC1: (age: number) => ({type: 'SET_AGE', age} as const),
    AC2: (firstName: string, lastName: string) => ({type: 'SET_NAME', firstName, lastName} as const)
};

let actionValueType: ReturnType<ObjPropertiesType<typeof actions>> = {type: "SET_AGE", age: 8}

console.log(actionValueType)



