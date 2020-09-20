import usersReducer, {UsersReducerInitStateType, usersReducerActionCreators} from "./users-reducer";

let state: UsersReducerInitStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Nikky 0',
                status: 'status 0',
                followed: false,
                photos: {
                    large: null,
                    small: null
                }
            },
            {
                id: 1,
                name: 'Nikky 1',
                status: 'status 1',
                followed: false,
                photos: {
                    large: null,
                    small: null
                }
            },
            {
                id: 2,
                name: 'Nikky 2',
                status: 'status 2',
                followed: true,
                photos: {
                    large: null,
                    small: null
                }
            },
            {
                id: 3,
                name: 'Nikky 3',
                status: 'status 3',
                followed: true,
                photos: {
                    large: null,
                    small: null
                }
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    };
})

test('follow success', () => {
    const newState = usersReducer(state, usersReducerActionCreators.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})
test('unfollow success', () => {
    const newState = usersReducer(state, usersReducerActionCreators.unfollowSuccess(3))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeFalsy();
})
