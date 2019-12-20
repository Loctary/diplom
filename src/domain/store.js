import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import dataReducer from './data/reducer';
import uiReducer from './ui/reducer';
import { fetchDataWatcher } from './data/sagas';

export const sagaMiddleware = createSagaMiddleware();

const storeState = combineReducers({
  data: dataReducer,
  ui: uiReducer,
});

export const store = createStore(storeState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
export const history = createBrowserHistory();

sagaMiddleware.run(fetchDataWatcher);