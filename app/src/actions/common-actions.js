import { errorActions } from './error-actions';
import fetch from 'cross-fetch';
import { processResponse, update, updateEdit } from '../utils';
import api from '../api';

const sort = (data, dataType, sortType, sortKey) => {
  const sortPattern = (p1, p2) => p1[sortKey] - p2[sortKey];

  const sortedData = [...data];

  const constantsType = dataType.toUpperCase();

  const actionKeyType = `${constantsType}_SORT`;

  sortedData.sort((datum1, datum2) => {
    return ['New', 'Top'].includes(sortType)
      ? sortPattern(datum2, datum1)
      : sortPattern(datum1, datum2);
  });

  return {
    type: actionKeyType,
    sortKey: sortKey,
    sortType: sortType,
    data: sortedData,
    loading: false,
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
    .then(res =>
      processResponse(res, `Failure in ${failureOptionName} ${dataType}`),
    )
    .then(datum => dispatch(success(datum)))
    .catch(error => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(error));
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

  dispatch(request());

  return fetch(`${api.url}/${dataType}s/${id}`, {
    method: 'PUT',
    body: JSON.stringify(param),
    headers: {
      ...api.headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => processResponse(res, `Failure in editing ${dataType}`))
    .then(datum => dispatch(success(datum)))
    .catch(error => {
      dispatch(failure());
      dispatch(errorActions.showGlobalError(error));
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

  dispatch(request());

  return fetch(`${api.url}/${dataType}s/${id}`, {
    method: 'DELETE',
    headers: {
      ...api.headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => processResponse(res, `Failure in deleting ${dataType}`))
    .then(datum => dispatch(success(datum)))
    .catch(error => {
      console.log('CHECK ERROR: ', error);
      dispatch(failure());
      dispatch(errorActions.showGlobalError(error));
    });
};

export const commonActions = {
  vote,
  sort,
  edit,
  remove,
};
