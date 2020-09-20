
export type Nullable<T> = null | T;

export type PostType = {
    id: number,
    message: string,
    likesCount: number,
    img: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string | null
}


export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type DialogType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    newMessagesCount: number
    photos: PhotosType
    userName: string
}
export type DialogMessage = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null
    viewed: boolean
}
export type DeletedDialogMessageType = {
    id: string
    restoredInterval: number
}


export type FriendSidebarType = {
    id: number,
    name: string
    img: string
}
