
import {connect} from "react-redux";
import Friends from "./Friends";
import {FriendSidebarType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type MapStateProps = {
    friends: Array<FriendSidebarType>
}

const mapStateToProps = (state: AppStateType): MapStateProps => {
    return {
        friends: state.sidebar.friends
    }
};

const mapDispatchToProps = () => {
    return {}
};

let FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;