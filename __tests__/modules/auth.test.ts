import reducer, {
  StateType,
  AuthActionTypes,
  ActionTypes,
  login,
  logOut
} from "../../client/modules/auth";

/*
 * Reducer
 */
describe("auth reducer", (): void => {
  /**
   * 条件：
   * 渡されたアクションが定義されていない
   *
   * 期待値：
   * initStateの値がそのまま返却されること
   */
  it("should return the initial state", (): any => {
    const initState: StateType = { userName: "initial state" };
    const expectedAction: AuthActionTypes = {
      type: undefined,
      payload: "obama"
    };
    expect(reducer(initState, expectedAction)).toEqual({ ...initState });
  });

  /**
   * 条件：
   * stateの初期値 => { userName: "initial state" }
   * stateの更新値 => { userName: "new state" }
   *
   * 期待値：
   * educerの返り値(state)が渡されたアクションの値("new state")に更新されていること
   */
  it("should handle LoginAction", (): any => {
    const initState: StateType = { userName: "initial state" };
    const userName = "new state";
    expect(reducer(initState, login(userName))).toEqual({ userName });
  });

  /**
   * 条件：
   * stateの初期値 => { userName: "prev state" }
   *
   * 期待値：
   * educerの返り値(state)が("")に更新されていること
   */
  it("should handle LogOutAction", (): any => {
    const state: StateType = { userName: "prev state" };
    expect(reducer(state, logOut())).toEqual({ userName: "" });
  });
});

/**
 * Login Action
 */
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

/**
 * Logout Action
 */
describe("logout action", (): void => {
  it("should create an action to logout", (): any => {
    const expectedAction: AuthActionTypes = {
      type: ActionTypes.LOGOUT,
      payload: ""
    };
    expect(logOut()).toEqual(expectedAction);
  });
});
