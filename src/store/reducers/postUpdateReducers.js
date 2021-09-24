/**
 * @description :  This file has  user update reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

 import { createReducer } from '../../utils/helpers';
 import { USER_POST } from '../constants';
 
 const initialState = {
   isRequesting: false,
   isError: false,
   isSuccess: false,
   data: null
 };
 
 export default createReducer(initialState, {
   [USER_POST.USER_POST_REQUEST]: (state, payload) => {
     return {
       ...state,
       isRequesting: true,
       isSuccess: false,
       isError: false,
       data: null
     };
   },
   [USER_POST.USER_POST_SUCCESS]: (state, payload) => {
     return {
       ...state,
       isRequesting: false,
       isSuccess: true,
       isError: false,
       data: payload
     };
   },
   [USER_POST.USER_POST_FAILURE]: (state, payload) => {
     return {
       ...state,
       isRequesting: false,
       isSuccess: false,
       isError: true,
       data: payload
     };
   },
   [USER_POST.USER_POST_RESET]: (state, payload) => {
     return {
       ...state,
       isRequesting: false,
       isSuccess: false,
       isError: false,
       data: null
     };
   }
 });
 