import * as actionTypes from 'actions/actionTypes';

const initialState = {
  isLoggedIn: false,
};

export default function appState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    default: {
      return state;
    }
  }
}
