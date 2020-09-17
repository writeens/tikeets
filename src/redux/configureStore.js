import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { authReducer } from './auth';
import { eventsReducer } from './events';

const appReducer = combineReducers({
  events: eventsReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default () => {
  // Setup Enhancers
  const middlewareEnhancer = applyMiddleware(thunk);

  // Compose Enhancers
  const composedEnhancers = compose(middlewareEnhancer);

  // Create Store
  const store = createStore(
    persistedReducer,
    composedEnhancers,
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
