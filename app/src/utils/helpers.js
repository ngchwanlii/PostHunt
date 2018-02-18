import { createSelector } from 'reselect';

const sortKeySelector = state => state.sortKey;
const sortTypeSelector = state => state.sortType;
const sortPattern = (p1, p2, sortKey) => {
  let elemOne = p1[sortKey];
  let elemTwo = p2[sortKey];
  if (elemOne < elemTwo) {
    return -1;
  }
  if (elemOne > elemTwo) {
    return 1;
  }
  return 0;
};

export const sortIfNeeded = (dataType, sortTypes) =>
  createSelector(
    state => state[`${dataType}Data`],
    sortKeySelector,
    sortTypeSelector,
    (data, sortKey, sortType) =>
      !sortKey
        ? data
        : [...data].sort(
            (datum1, datum2) =>
              sortTypes.includes(sortType)
                ? sortPattern(datum2, datum1, sortKey)
                : sortPattern(datum1, datum2, sortKey),
          ),
  );

export const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

export const capitalize = (str = '') => {
  return typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1);
};

export const processResponse = res => {
  if (res.ok) {
    return res.json();
  }
  throw res.status
};

export const formatTime = miliseconds => {
  let dateObject = new Date(miliseconds);
  let year = dateObject.getFullYear();
  let month = dateObject.getMonth() + 1;
  let date = dateObject.getDate();
  return [date, month, year].join('/');
};

// for update use in edit function
export const updateEdit = (data, datum) => {
  return data.map(prevDatum => (prevDatum.id === datum.id ? datum : prevDatum));
};

// helpers for deep clone and modified data
export const update = (data, datum, key) => {
  return data.reduce((newData, prevDatum) => {
    if (prevDatum.id === datum.id) {
      prevDatum = { ...prevDatum, [key]: datum[key] };
    }
    return [...newData, prevDatum];
  }, []);
};

export const randomize = items => {
  return items[Math.floor(Math.random() * items.length)];
};
