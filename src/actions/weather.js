import { types } from '../types/types';

export const getCities = (payload) => ({
  type: types.getCities,
  payload,
});

export const setCities = (payload) => ({
  type: types.setCities,
  payload,
});
