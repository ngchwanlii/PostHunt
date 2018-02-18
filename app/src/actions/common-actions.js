import { errorActions } from './error-actions';
import fetch from 'cross-fetch';
import { processResponse, update, updateEdit } from '../utils';
import api from '../api';

const sort = (dataType, sortType, sortKey) => {
  return {
    type: `${dataType.toUpperCase()}_SORT`,
    sortType: sortType,
    sortKey: sortKey,
  };
};

export const vote = ({ dataType, id, option }) => (dispatch, getState) => {
  const keyProp = 'voteScore';

  const failureOptionName = option.toLowerCase();
  const reducerType = dataType.slice(0, -1);
  const constantsType = reducerType.toUpperCase();

  const request = () => ({ type: `${constantsType}_VOTE_REQUEST` });
  const failure = () => ({ type: `${constantsType}_VOTE_FAILURE` });
  const success = datum => {
    const chosenData = getState()[`${dataType.slice(0, -1)}Reducers`][
      `${dataType}Data`
    ];

    return {
      type: `${constantsType}_VOTE_SUCCESS`,
      data: update(chosenData, datum, keyProp),
    };
  };
  const failureText = `Failure in ${failureOptionName} ${dataType}`;

  dispatch(request());

  return fetch(`${api.url}/${dataType}/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      option,
    }),
    headers: {
      ...api.headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => processResponse(res))
    .then(datum => dispatch(success(datum)))
    .catch(error => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(failureText));
    });
};

const edit = (id, param, dataType) => (dispatch, getState) => {
  const constantsType = dataType.toUpperCase();

  const request = () => ({
    type: `${constantsType}_EDIT_${constantsType}_REQUEST`,
  });
  const failure = () => ({
    type: `${constantsType}_EDIT_${constantsType}_FAILURE`,
  });
  const success = datum => {
    const chosenData = getState()[`${dataType}Reducers`][`${dataType}sData`];

    return {
      type: `${constantsType}_EDIT_${constantsType}_SUCCESS`,
      data: updateEdit(chosenData, datum),
    };
  };
  const failureText = `Failure in editing ${dataType}`;
  const errorDetail = `Unable to edit selected ${dataType}!`;

  dispatch(request());

  return fetch(`${api.url}/${dataType}s/${id}`, {
    method: 'PUT',
    body: JSON.stringify(param),
    headers: {
      ...api.headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => processResponse(res))
    .then(datum => dispatch(success(datum)))
    .catch(error => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(failureText, errorDetail));
    });
};

const remove = (id, dataType) => (dispatch, getState) => {
  const constantsType = dataType.toUpperCase();

  const request = () => ({
    type: `${constantsType}_DELETE_${constantsType}_REQUEST`,
  });
  const failure = () => ({
    type: `${constantsType}_DELETE_${constantsType}_FAILURE`,
  });
  const success = datum => {
    const chosenData = getState()[`${dataType}Reducers`][`${dataType}sData`];
    return {
      type: `${constantsType}_DELETE_${constantsType}_SUCCESS`,
      data: chosenData.filter(data => data.id !== datum.id),
    };
  };
  const failureText = `Failure in deleting ${dataType}`;
  const errorDetail = `Unable to delete selected ${dataType}!`;

  dispatch(request());

  return fetch(`${api.url}/${dataType}s/${id}`, {
    method: 'DELETE',
    headers: {
      ...api.headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => processResponse(res))
    .then(datum => dispatch(success(datum)))
    .catch(error => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(failureText, errorDetail));
    });
};

export const commonActions = {
  vote,
  sort,
  edit,
  remove,
};
