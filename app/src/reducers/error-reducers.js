import {errorConstants} from "../constants";

const errorReducers = (state = {
  globalError: null,
}, action) => {
  switch(action.type){
    case errorConstants.SHOW_GLOBAL_ERROR:
      return {
        globalError: action.error
      }
    case errorConstants.RESET_GLOBAL_ERROR:
      return {
        globalError: null
      }
    default:
      return state
  }
}

export default errorReducers
