import {postConstants} from '../constants';
import fetch from 'cross-fetch';
import api from '../api';
import {errorActions} from './error-actions';
import {processResponse} from '../utils';
import {commonActions} from './common-actions';

const uuidv4 = require('uuid/v4');

const fetchPosts = (category = 'all') => (dispatch, getState) => {
  const request = () => ({type: postConstants.GET_ALL_REQUEST});
  const success = data => {
    const {sortKey, sortType} = getState().postReducers;

    return sortType
      ? commonActions.sort(data, 'post', sortType, sortKey)
      : {type: postConstants.GET_ALL_SUCCESS, data};
  };
  const failure = () => ({type: postConstants.GET_ALL_FAILURE});

  dispatch(request());

  let apiEndPoint = `${api.url}/posts`;

  if (category !== 'all') {
    apiEndPoint = `${api.url}/${category}/posts`;
  }

  return fetch(apiEndPoint, {
    headers: api.headers
  })
  .then(res => processResponse(res, 'Failure in fetching all post'))
  .then(posts => dispatch(success(posts)))
  .catch(error => {
    dispatch(failure());
    dispatch(errorActions.showGlobalError(error));
  });
};

const addPost = payload => (dispatch, getState) => {
  const {sortType, postsData} = getState().postReducers;
  const {selectedCategory} = getState().categoryReducers;

  const request = () => ({type: postConstants.POST_ADD_POST_REQUEST});
  const failure = () => ({type: postConstants.POST_ADD_POST_FAILURE});
  const success = newPost => {
    let nextPostsData = ['Newest', 'Top'].includes(sortType)
      ? [newPost, ...postsData]
      : [...postsData, newPost];

    if (selectedCategory !== 'all') {
      nextPostsData = nextPostsData.filter(
        post => post.category === selectedCategory
      );
    }
    return {type: postConstants.POST_ADD_POST_SUCCESS, data: nextPostsData};
  };

  dispatch(request());

  return fetch(`${api.url}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      ...payload
    }),
    headers: {
      ...api.headers,
      'Content-Type': 'application/json'
    }
  })
  .then(res => processResponse(res, `Failure in submitting post form`))
  .then(newPost => {
    dispatch(success(newPost));
  })
  .catch(error => {
    dispatch(failure());
    dispatch(errorActions.showGlobalError(error));
  });
};

const fetchDetailPost = post_id => dispatch => {
  const request = () => ({type: postConstants.FETCH_POST_REQUEST});
  const success = data => {
    return {type: postConstants.FETCH_POST_SUCCESS, data: [data].filter(d => d.deleted !== true)};
  };
  const failure = () => ({type: postConstants.FETCH_POST_FAILURE});

  dispatch(request());

  return fetch(`${api.url}/posts/${post_id}`, {
    headers: api.headers
  })
  .then(res => processResponse(res, 'Failure in fetching selected post'))
  .then(post => dispatch(success(post)))
  .catch(error => {
    dispatch(failure());
    dispatch(errorActions.showGlobalError(error));
  });
};

export const postActions = {
  fetchPosts,
  fetchDetailPost,
  addPost
};
