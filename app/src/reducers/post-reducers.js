import { postConstants } from '../constants';

// reducers
const postReducers = (
  state = {
    postsLoading: false,
    postsData: [],
  },
  action,
) => {
  switch (action.type) {
    case postConstants.GET_ALL_REQUEST:
      return {
        ...state,
        postsLoading: true,
      };
    case postConstants.GET_ALL_FAILURE:
      return {
        ...state,
        postsLoading: false,
      };
    case postConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        postsData: action.data,
      };

    // upvote
    case postConstants.POST_VOTE_FAILURE:
      return {
        ...state,
        postsLoading: action.loading,
      };
    case postConstants.POST_VOTE_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        postsData: action.data,
      };

    // sort
    case postConstants.POST_SORT:
      return {
        ...state,
        sortKey: action.sortKey,
        sortType: action.sortType,
      };
    // addPost
    case postConstants.POST_ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      };
    case postConstants.POST_ADD_POST_SUCCESS:
      return {
        ...state,
        postsData: action.data,
        addPostLoading: false,
      };
    case postConstants.POST_ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
      };
    case postConstants.FETCH_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case postConstants.FETCH_POST_SUCCESS:
      return {
        ...state,
        postsData: action.data,
        postLoading: false,
      };
    case postConstants.FETCH_POST_FAILURE:
      return {
        ...state,
        postLoading: false,
      };
    case postConstants.POST_EDIT_POST_REQUEST:
      return {
        ...state,
        editPostLoading: true,
      };
    case postConstants.POST_EDIT_POST_SUCCESS:
      return {
        ...state,
        postsData: action.data,
        editPostLoading: false,
      };
    case postConstants.POST_EDIT_POST_FAILURE:
      return {
        ...state,
        editPostLoading: false,
      };
    case postConstants.POST_DELETE_POST_REQUEST:
      return {
        ...state,
        deletePostLoading: true,
      };

    case postConstants.POST_DELETE_POST_SUCCESS:
      return {
        ...state,
        postsData: action.data,
        deletePostLoading: false,
      };

    case postConstants.POST_DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostLoading: false,
      };
    default:
      return state;
  }
};

export default postReducers;
