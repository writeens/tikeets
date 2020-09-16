import { upcomingEvents } from '../events';
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
} from './constants';

/** FETCH COMPLAINTS ACTIONS */
const fetchEventsRequest = () => ({
  type: FETCH_EVENTS_REQUEST,
});
const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events,
});
const fetchEventsFail = (e) => ({
  type: FETCH_EVENTS_FAIL,
  payload: e,
});

/** Action with Redux Thunk */
const startFetchEvents = () => (dispatch) => {
  console.log('Fetching Events');
  dispatch(fetchEventsRequest());
  try {
    // Mimic API call
    setTimeout(() => {
      dispatch(fetchEventsSuccess(upcomingEvents));
    }, 3000);
  } catch (e) {
    dispatch(fetchEventsFail({ message: 'Unable to fetch events', code: 'events/fetch-fail' }));
  }
};

const defaultEventsState = {
  fetch: {
    error: false,
    loading: false,
    data: [],
    errorData: null,
  },
};

const eventsReducer = (state = defaultEventsState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        fetch: {
          error: false,
          loading: true,
          data: [],
          errorData: null,
        },
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        fetch: {
          error: false,
          loading: false,
          data: action.payload,
          errorData: null,
        },
      };
    case FETCH_EVENTS_FAIL:
      return {
        ...state,
        fetch: {
          error: true,
          loading: false,
          errorData: action.payload,
        },
      };
    default:
      return state;
  }
};

export {
  eventsReducer,
  startFetchEvents,
};
