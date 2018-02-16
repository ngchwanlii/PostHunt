import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

// const loggerMiddleware = createLogger();

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  // reference url: https://github.com/zalmoxisus/redux-devtools-extension
});

export const store = createStore(
  rootReducer,
  composeEnhancers(
    // applyMiddleware(thunkMiddleware, loggerMiddleware),
    applyMiddleware(thunkMiddleware),
  ),
);
