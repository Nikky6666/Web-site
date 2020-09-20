import {ActionsTypes} from "./redux-store";

let initialState = {
    friends: [
        {
            id: 1,
            name: 'Jey',
            img: 'https://yt3.ggpht.com/a/AGF-l78XZgyutXUlON-U4sTy-EwaZoBJXrqGvQ2kxg=s900-c-k-c0xffffffff-no-rj-mo'
        },
        {
            id: 2,
            name: 'Kristin',
            img: 'https://yt3.ggpht.com/a/AGF-l78XZgyutXUlON-U4sTy-EwaZoBJXrqGvQ2kxg=s900-c-k-c0xffffffff-no-rj-mo'
        },
        {
            id: 3,
            name: 'Mike',
            img: 'https://yt3.ggpht.com/a/AGF-l78XZgyutXUlON-U4sTy-EwaZoBJXrqGvQ2kxg=s900-c-k-c0xffffffff-no-rj-mo'
        },
    ]
};

export type SidebarInitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: SidebarReducerActionsTypes): SidebarInitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

type SidebarReducerActionsTypes = ActionsTypes<typeof sidebarReducerActionCreactors>

export const sidebarReducerActionCreactors = {
    test: () => ({type: 'test'}),
};

export default sidebarReducer;