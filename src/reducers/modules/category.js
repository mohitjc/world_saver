/* eslint-disable array-callback-return */
/*
 * @file: category.js.js
 * @description: Reducers and actions for store/manipulate Category data
 * @date: 4 JULY 2020
 * @author: Mandeep
 */

import * as TYPE from '../../actions/constants';
/******** Reducers ********/

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TYPE.GET_CATEGORY:
            return action.data;
        case TYPE.LOG_OUT:
            return initialState;
        default:
            return state;
    }
}
