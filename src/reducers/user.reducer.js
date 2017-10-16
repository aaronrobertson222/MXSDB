import * as actionTypes from 'actions/actionTypes';

const initialState = {
  user: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_LOGIN: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
