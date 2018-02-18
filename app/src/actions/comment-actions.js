import fetch from 'cross-fetch';
import api from '../api';
import { errorActions } from './error-actions';
import { processResponse } from '../utils';
import { commentConstants } from '../constants/comment-constants';

const uuidv4 = require('uuid/v4');

const fetchCommentsByPostId = post_id => dispatch => {
  const request = () => ({ type: commentConstants.FETCH_COMMENTS_REQUEST });
  const success = data => ({
    type: commentConstants.FETCH_COMMENTS_SUCCESS,
    data: data.filter(d => d.parentDeleted !== true && d.deleted !== true),
  });
  const failure = () => ({ type: commentConstants.FETCH_COMMENTS_FAILURE });
  const failureText = 'Failure in fetching comments from selected post';

  dispatch(request());

  return fetch(`${api.url}/posts/${post_id}/comments`, {
    headers: api.headers,
  })
    .then(res => processResponse(res))
    .then(comments => dispatch(success(comments)))
    .catch(error => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(failureText));
    });
};

const addComment = payload => (dispatch, getState) => {
  const { sortType, commentsData } = getState().commentReducers;

  const request = () => ({
    type: commentConstants.COMMENT_ADD_COMMENT_REQUEST,
  });
  const failure = () => ({
    type: commentConstants.COMMENT_ADD_COMMENT_FAILURE,
  });
  const success = newPost => {
    let nextCommentsData = ['New', 'Top'].includes(sortType)
      ? [newPost, ...commentsData]
      : [...commentsData, newPost];
    return {
      type: commentConstants.COMMENT_ADD_COMMENT_SUCCESS,
      data: nextCommentsData,
    };
  };
  const failureText = `Failure in submitting comment`;

  dispatch(request());

  return fetch(`${api.url}/comments`, {
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
      dispatch(errorActions.showGlobalError(failureText));
    });
};

export const commentActions = {
  fetchCommentsByPostId,
  addComment,
};
