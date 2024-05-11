import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';

import { configureStore } from '@reduxjs/toolkit';

import { CombinedState } from './interfaces';
import rootReducer from './createRootReducer';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer(history),
  middleware: [routerMiddleware(history), thunkMiddleware, sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development',
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<CombinedState> = useSelector;
