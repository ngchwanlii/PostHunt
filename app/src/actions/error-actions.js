import {errorConstants} from "../constants/error-constants";

const showGlobalError = (errorText) => ({
  type: errorConstants.SHOW_GLOBAL_ERROR,
  status: "error",
  error: errorText
})

const resetGlobalError = () => ({
  type: errorConstants.RESET_GLOBAL_ERROR,
})

export const errorActions = {
  showGlobalError,
  resetGlobalError
};