import React from 'react';
import Users from "./Users";
/*import {withAuthRedirect} from "../../hoc/withAuthRedirect";*/
import {
    getIsFetching
} from "../../redux/users-selectors";
import Preloader from "../../common/Preloader/Preloader";
import {useSelector} from "react-redux";


type UsersPagePropsType = {}

const UsersPage: React.FC<UsersPagePropsType> = () => {
    const isFetching = useSelector(getIsFetching)
    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users />
        </>
    )
}



export default UsersPage