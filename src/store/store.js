import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

/* eslint-disable */
const persistedState = localStorage.getItem('applican_store') ? JSON.parse(localStorage.getItem('applican_store')) : {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);
/* eslint-enable */

store.subscribe(() => {
  localStorage.setItem('applican_store', JSON.stringify(store.getState()));
});
export default store;
