import {
  AuthActionTypes,
  ActionTypes,
  login,
  loginOut
} from "../../client/modules/auth";

describe("login action", (): void => {
  it("should create an action to login", (): any => {
    const userName = "taro";
    const expectedAction: AuthActionTypes = {
      type: ActionTypes.LOGIN,
      payload: userName
    };
    expect(login(userName)).toEqual(expectedAction);
  });
});

describe("logout action", (): void => {
  it("should create an action to logout", (): any => {
    const expectedAction: AuthActionTypes = {
      type: ActionTypes.LOGOUT,
      payload: ""
    };
    expect(loginOut()).toEqual(expectedAction);
  });
});
