import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './reducers';

const reducers = combineReducers;

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof store.getState>;
