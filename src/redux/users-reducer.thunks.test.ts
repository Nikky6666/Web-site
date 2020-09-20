import {usersReducerActionCreators, follow, unfollow} from './users-reducer'
import {userAPI} from '../api/users-api'
import {ResponseType, ResultCodesEnum} from '../api/api'

jest.mock('../api/users-api')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})


const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));



test('success follow thunk', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersReducerActionCreators.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersReducerActionCreators.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersReducerActionCreators.toggleFollowingInProgress(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersReducerActionCreators.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersReducerActionCreators.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersReducerActionCreators.toggleFollowingInProgress(false, 1))
})
