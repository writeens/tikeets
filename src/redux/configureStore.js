import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { eventsReducer } from './events';

const appReducer = combineReducers({
  events: eventsReducer,
});

export default () => {
  // Setup Enhancers
  const middlewareEnhancer = applyMiddleware(thunk);

  // Compose Enhancers
  const composedEnhancers = compose(middlewareEnhancer);

  // Create Store
  const store = createStore(
    appReducer,
    composedEnhancers,
  );

  return store;
};
