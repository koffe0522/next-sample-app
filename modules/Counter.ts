import { Action } from "redux";

/**
 * `Action Type`
 *  ActionTypeを定義する列挙型
 * @enum {number}
 */
enum ActionTypes {
  INCREMENT = "COUNTER_INCREMENT",
  DECREMENT = "COUNTER_DECREMENT"
}

/**
 * ActionCreaterの返り値を定義するI/F
 * @interface IncrementAction
 */
interface IncrementAction extends Action {
  type: typeof ActionTypes.INCREMENT;
}

/**
 * ActionCreaterの返り値を定義するI/F
 * @interface DecrementAction
 */
interface DecrementAction {
  type: typeof ActionTypes.DECREMENT;
}

/* Type */
type CounterActionTypes = IncrementAction | DecrementAction;

/**
 * ステートを定義するI/F
 * @interface Istate
 */
interface Istate {
  /**
   * @type {number}
   * @memberof State
   */
  count: number;
}

/* Initial state */
const initialState: Istate = {
  count: 0
};

/**
 * `Reducer`
 * @param {State} state ステート
 * @param {CounterActionTypes} action アクション
 * @returns {State} ステート
 */
const reducer = (
  state: Istate = initialState,
  action: CounterActionTypes
): Istate => {
  const { type } = action;
  switch (type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };

    case ActionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
};
export default reducer;

/* Action Creater */
export const increment = (): CounterActionTypes => ({
  type: ActionTypes.INCREMENT
});
export const decrement = (): CounterActionTypes => ({
  type: ActionTypes.DECREMENT
});
