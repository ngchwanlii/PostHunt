import { combineReducers } from 'redux';
import categoryReducers from './category-reducers';
import postReducers from './post-reducers';
import errorReducers from './error-reducers';
import commonReducers from './common-reducers';
import commentReducers from './comment-reducers';

const appReducer = combineReducers({
  categoryReducers,
  postReducers,
  errorReducers,
  commonReducers,
  commentReducers,
});

export default (state, action) => {
  return appReducer(state, action);
};
