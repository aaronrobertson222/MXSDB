import * as actionTypes from 'actions/actionTypes';

const initialState = {
  user: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.response.user,
      };
    }
    case actionTypes.FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.response.user,
      };
    }
    case actionTypes.USER_LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}
