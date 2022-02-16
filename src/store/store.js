import { createStore, combineReducers } from 'redux';
import { weatherReducer } from '../reducers/weatherReducer';

const reducers = combineReducers({
  weather: weatherReducer,
});

export const store = createStore(reducers);
