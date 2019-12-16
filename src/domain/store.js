import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import dataReducer from './data/reducer';


const storeState = combineReducers({
  data: dataReducer,
});

export const store = createStore(storeState, composeWithDevTools());
export const history = createBrowserHistory();
