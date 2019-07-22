/**
 * `Action Type`
 *  ActionTypeを定義する列挙型
 * @enum {number}
 */
export enum ActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT"
}

/**
 * ActionCreaterの返り値を定義するI/F
 * @interface LoginAction
 */
interface LoginAction {
  type: typeof ActionTypes.LOGIN;
  payload: string;
}

/**
 * ActionCreaterの返り値を定義するI/F
 * @interface LogoutAction
 */
interface LogoutAction {
  type: typeof ActionTypes.LOGOUT;
  payload: string;
}

/* Type */
export type AuthActionTypes = LoginAction | LogoutAction;

/**
 * ステートを定義するI/F
 * @interface StateType
 */
interface StateType {
  /**
   * @type {string}
   * @memberof State
   */
  userName: string;
}

/* Initial state */
const initialState: StateType = {
  userName: ""
};

type ReducerType = (state: StateType, action: AuthActionTypes) => StateType;
/**
 * `Reducer`
 * @param {State} state ステート
 * @param {AuthActionTypes} action アクション
 * @returns {State} ステート
 */
const reducer: ReducerType = (
  state: StateType = initialState,
  action: AuthActionTypes
): StateType => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        userName: payload
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        userName: ""
      };

    default:
      return state;
  }
};
export default reducer;

export const login = (params: string): LoginAction => ({
  type: ActionTypes.LOGIN,
  payload: params
});

export const loginOut = (): LogoutAction => ({
  type: ActionTypes.LOGOUT,
  payload: ""
});
