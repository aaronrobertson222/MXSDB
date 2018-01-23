import * as actionTypes from 'actions/actionTypes';

const initialState = {
  recentItems: null,
  popularItems: null,
  filterItems: null,
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_RECENT_ITEMS_REQUEST_SUCCESS: {
      return {
        ...state,
        recentItems: action.response.items,
      };
    }
    case actionTypes.FETCH_POPULAR_ITEMS_REQUEST_SUCCESS: {
      return {
        ...state,
        popularItems: action.response.items,
      };
    }
    default: {
      return state;
    }
  }
}
