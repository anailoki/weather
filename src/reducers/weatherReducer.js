import { types } from '../types/types';

const initialState = {
  cities: [],
  isLoading: false,
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setCities:
      return {
        cities: action.payload,
        isLoading: false,
      };

    case types.getCities: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};
