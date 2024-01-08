// store.js
import { createStore } from 'redux';
import addToCartReducer from '../reducers/addToCartReducer';

const store = createStore(addToCartReducer);

export default store;
