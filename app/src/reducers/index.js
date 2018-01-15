import indicator from './indicator';
import {combineReducers} from "redux";

const appReducer = combineReducers({
  indicator,
});

export default (state, action) => {
  return appReducer(state, action)
};
