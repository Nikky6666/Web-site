import {follow, unfollow, usersReducerActionCreators} from "./users-reducer";
import {userAPI} from "../api/users-api";
import {CommonResponseType, ResultCodesEnum} from "../api/api";
jest.mock('../api/users-api');

const userApiMock = userAPI as jest.Mocked<typeof userAPI>;

const result: CommonResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Success
}
userApiMock.follow.mockReturnValue(Promise.resolve(result));
userApiMock.unfollow.mockReturnValue(Promise.resolve(result));

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userApiMock.follow.mockClear();
    userApiMock.unfollow.mockClear();
})

test('success follow thunk', async () => {
    const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1,
        usersReducerActionCreators.toggleFollowingInProgress(
            true,
            1
        ))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,
        usersReducerActionCreators.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,
        usersReducerActionCreators.toggleFollowingInProgress(
            false,
            1
        ))
})
test('success unfollow thunk', async () => {
    const thunk = unfollow(1);

  await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1,
        usersReducerActionCreators.toggleFollowingInProgress(
            true,
            1
        ))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,
        usersReducerActionCreators.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,
        usersReducerActionCreators.toggleFollowingInProgress(
            false,
            1
        ))
})
