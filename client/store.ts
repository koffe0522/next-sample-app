import { createStore, combineReducers, applyMiddleware } from "redux";

/* middleware */
import { createLogger } from "redux-logger";

/* reducer */
import counterReducers from "./modules/Counter";
import authReducer from "./modules/Auth";

/* reducers */
const reducers = {
  counter: counterReducers,
  auth: authReducer
};

/**
 * `logger`
 * @param {object} option: ログ出力のオプション
 */
const logger = createLogger({
  diff: true,
  collapsed: true
});

/**
 * `create store`
 * @param {object} initialState
 */
// 理由：any型だとeslintで警告が出るため
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = (initialState: any): any =>
  createStore(
    combineReducers({ ...reducers }),
    initialState,
    applyMiddleware(logger)
  );

export default store;
