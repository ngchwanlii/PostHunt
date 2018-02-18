import { errorConstants } from '../constants';

const initialState = {
  errorDetail: null,
  globalError: null,
  redirectNeeded: false,
  redirectMessage: null,
};

const errorReducers = (state = initialState, action) => {
  switch (action.type) {
    case errorConstants.SHOW_GLOBAL_ERROR:
      return {
        ...state,
        errorDetail: action.errorDetail,
        globalError: action.error,
      };
    case errorConstants.SHOW_REDIRECT_MESSAGE:
      return {
        ...state,
        globalError: null,
        redirectNeeded: true,
        redirectMessage: action.redirectMessage,
      };
    case errorConstants.RESET_GLOBAL_ERROR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default errorReducers;
