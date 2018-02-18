import { errorConstants } from '../constants/error-constants';

const showGlobalError = (errorText, errorDetail = null) => ({
  type: errorConstants.SHOW_GLOBAL_ERROR,
  errorDetail: errorDetail,
  error: errorText,
});

const showRedirectMessage = message => ({
  type: errorConstants.SHOW_REDIRECT_MESSAGE,
  redirectMessage: message
});

const resetGlobalError = () => ({
  type: errorConstants.RESET_GLOBAL_ERROR,
});

export const errorActions = {
  showGlobalError,
  showRedirectMessage,
  resetGlobalError,
};
