/**
 * @description :  This file has  get all users reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

 import { createReducer } from '../../utils/helpers';
 import { GET_POSTS } from '../constants';
 
 const initialState = {
   isRequesting: false,
   isError: false,
   isSuccess: false,
   data: null
 };
 
 export default createReducer(initialState, {
   [GET_POSTS.GET_POSTS_REQUEST]: (state, payload) => {
     return {
       ...state,
       isRequesting: true,
       isSuccess: false,
       isError: false,
       data: null
     };
   },
   [GET_POSTS.GET_POSTS_SUCCESS]: (state, payload) => {
     return {
       ...state,
       isRequesting: false,
       isSuccess: true,
       isError: false,
       data: payload
     };
   },
   [GET_POSTS.GET_POSTS_FAILURE]: (state, payload) => {
     return {
       ...state,
       isRequesting: false,
       isSuccess: false,
       isError: true,
       data: payload
     };
   },
   [GET_POSTS.GET_POSTS_RESET]: (state, payload) => {
     return {
       ...state,
       isRequesting: false,
       isSuccess: false,
       isError: false,
       data: null
     };
   }
 });
 