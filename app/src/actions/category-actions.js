import fetch from 'cross-fetch';
import { categoryConstants } from '../constants';
import api from '../api';
import { processResponse } from '../utils';
import { errorActions } from './error-actions';

const getAll = () => dispatch => {
  const request = () => ({ type: categoryConstants.GET_ALL_REQUEST });
  const success = data => ({ type: categoryConstants.GET_ALL_SUCCESS, data});
  const failure = () => ({ type: categoryConstants.GET_ALL_FAILURE });

  dispatch(request());

  return fetch(`${api.url}/categories`, {
    headers: api.headers,
  })
    .then(res => processResponse(res, 'Failure in fetching all categories'))
    .then(data => {
      dispatch(success(data.categories));
    })
    .catch(error => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(error));
    });
};

const selectCategory = (category = 'all') => ({
  type: categoryConstants.SELECTED_CATEGORY,
  selectedCategory: category,
});

export const categoryActions = {
  getAll,
  selectCategory
};
