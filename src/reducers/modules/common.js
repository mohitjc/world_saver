import { GET_CATEGORY_LIST } from '../../actions/constants';

/******** Reducers ********/

const initialState = {
  categories: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_LIST:
      return { ...state, categories: action.data.data };
    default:
      return state;
  }
}
