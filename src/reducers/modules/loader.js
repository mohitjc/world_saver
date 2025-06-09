/*
 * @file: loalder.js
 * @description: Reducers and actions for store/manipulate loading  data
 * @date: 10 June 2020
 * @author: Poonam
 */

import * as TYPE from '../../actions/constants';

/******** Reducers ********/

const initialState = {
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.IS_LOADING:
      return { ...state, isLoading: action.status };

    case TYPE.LOG_OUT:
      return { ...initialState };

    default:
      return state;
  }
}
