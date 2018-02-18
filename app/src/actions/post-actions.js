import { postConstants } from '../constants';
import fetch from 'cross-fetch';
import api from '../api';
import { errorActions } from './error-actions';
import { processResponse } from '../utils';

const uuidv4 = require('uuid/v4');

const fetchPosts = (category = 'all') => dispatch => {
  const request = () => ({ type: postConstants.GET_ALL_REQUEST });
  const success = data => ({
    type: postConstants.GET_ALL_SUCCESS,
    data: data.filter(d => !d.deleted),
  });
  const failure = () => ({ type: postConstants.GET_ALL_FAILURE });
  const failureText = 'Failure in fetching all post';
  const errorDetail = 'Unable to fetch all post';
  const redirectText = 'Redirecting to homepage';

  dispatch(request());

  let apiEndPoint = `${api.url}/posts`;

  if (category !== 'all') {
    apiEndPoint = `${api.url}/${category}/posts`;
  }

  return fetch(apiEndPoint, {
    headers: api.headers,
  })
    .then(res => processResponse(res))
    .then(posts => dispatch(success(posts)))
    .catch(errorStatus => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(failureText, errorDetail));
      dispatch(errorActions.showRedirectMessage(redirectText));
    });
};

const addPost = payload => (dispatch, getState) => {
  const { sortType, postsData } = getState().postReducers;
  const { selectedCategory } = getState().categoryReducers;

  const request = () => ({ type: postConstants.POST_ADD_POST_REQUEST });
  const success = newPost => {
    let nextPostsData = ['Newest', 'Top'].includes(sortType)
      ? [newPost, ...postsData]
      : [...postsData, newPost];

    if (selectedCategory !== 'all') {
      nextPostsData = nextPostsData.filter(
        post => post.category === selectedCategory,
      );
    }
    return { type: postConstants.POST_ADD_POST_SUCCESS, data: nextPostsData };
  };
  const failure = () => ({ type: postConstants.POST_ADD_POST_FAILURE });
  const failureText = 'Failure in fetching all post';

  dispatch(request());

  return fetch(`${api.url}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      ...payload,
    }),
    headers: {
      ...api.headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => processResponse(res))
    .then(newPost => {
      dispatch(success(newPost));
    })
    .catch(errorStatus => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(failureText, errorStatus));
    });
};

const fetchDetailPost = post_id => dispatch => {
  const request = () => ({ type: postConstants.FETCH_POST_REQUEST });
  const success = data => ({
    type: postConstants.FETCH_POST_SUCCESS,
    data: [data].filter(d => !d.deleted),
  });

  const failure = () => ({ type: postConstants.FETCH_POST_FAILURE });
  const failureText = 'Failure in fetching selected post';
  const errorDetail = 'Unable to fetch selected post!';
  const redirectText = 'Redirecting to homepage';

  dispatch(request());

  return fetch(`${api.url}/posts/${post_id}`, {
    headers: api.headers,
  })
    .then(res => processResponse(res))
    .then(post => dispatch(success(post)))
    .catch(errorStatus => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(failureText, errorDetail));
      dispatch(errorActions.showRedirectMessage(redirectText));
    });
};

export const postActions = {
  fetchPosts,
  fetchDetailPost,
  addPost,
};
