import { commentConstants } from '../constants';

const commentReducers = (
  state = {
    commentsLoading: false,
    commentsData: [],
  },
  action,
) => {
  switch (action.type) {
    case commentConstants.FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        commentsLoading: true,
      };
    case commentConstants.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        commentsLoading: false,
      };
    case commentConstants.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsLoading: false,
        commentsData: action.data,
      };
    case commentConstants.COMMENT_VOTE_FAILURE:
      return {
        ...state,
        commentsLoading: action.loading,
      };
    case commentConstants.COMMENT_VOTE_SUCCESS:
      return {
        ...state,
        commentsLoading: false,
        commentsData: action.data,
      };
    // sort
    case commentConstants.COMMENT_SORT:
      return {
        ...state,
        sortKey: action.sortKey,
        sortType: action.sortType,
      };

    // add comment
    case commentConstants.COMMENT_ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
      };
    case commentConstants.COMMENT_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        commentsData: action.data,
        addCommentLoading: false,
      };
    case commentConstants.COMMENT_ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
      };
    case commentConstants.COMMENT_EDIT_COMMENT_REQUEST:
      return {
        ...state,
        editCommentLoading: true,
      };
    case commentConstants.COMMENT_EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        commentsData: action.data,
        editCommentLoading: false,
      };
    case commentConstants.COMMENT_EDIT_COMMENT_FAILURE:
      return {
        ...state,
        editCommentLoading: false,
      };
    case commentConstants.COMMENT_DELETE_COMMENT_REQUEST:
      return {
        ...state,
        deleteCommentLoading: true,
      };
    case commentConstants.COMMENT_DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        commentsData: action.data,
        deleteCommentLoading: false,
      };

    case commentConstants.COMMENT_DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deleteCommentLoading: false,
      };
    default:
      return state;
  }
};
export default commentReducers;
