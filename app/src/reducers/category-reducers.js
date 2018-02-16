import { categoryConstants } from '../constants';

const categoryReducers = (
  state = {
    categoriesLoading: false,
    categoriesData: [],
    selectedCategory: 'all',
  },
  action,
) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_REQUEST:
      return {
        ...state,
        categoriesLoading: true,
      };
    case categoryConstants.GET_ALL_FAILURE:
      return {
        ...state,
        categoriesLoading: false,
      };
    case categoryConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        categoriesLoading: false,
        categoriesData: action.data,
      };
    case categoryConstants.SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.selectedCategory,
      };
    default:
      return state;
  }
};
export default categoryReducers;
