import { createStore, combineReducers, applyMiddleware, Store } from "redux";

/* middleware */
import { createLogger } from "redux-logger";

/* reducer */
import counterReducers from "./modules/Counter";

/* reducers */
const reducers = {
  counter: counterReducers
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
