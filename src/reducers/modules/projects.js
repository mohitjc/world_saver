import * as TYPE from '../../actions/constants';

const initialState = {
  projects: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.PROJECTS_SUCCESS:
      return { ...state, ...action.data };
    case TYPE.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
