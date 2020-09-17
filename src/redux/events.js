import dayjs from 'dayjs';
import shortid from 'shortid';
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  CLEAR_CREATE_DATA,
} from './constants';

/** CREATE EVENT ACTIONS */
const createEventRequest = () => ({
  type: CREATE_EVENT_REQUEST,
});
const createEventSuccess = (event) => ({
  type: CREATE_EVENT_SUCCESS,
  payload: event,
});
const createEventFail = (e) => ({
  type: CREATE_EVENT_FAIL,
  payload: e,
});

/** CREATE EVENT THUNK */
const startCreateEvent = (event) => async (dispatch) => {
  dispatch(createEventRequest());
  try {
    const eventId = shortid.generate();
    const date = dayjs(event.date).format('ddd D MMM YYYY');
    const time = `${dayjs(`${event.date} ${event.time}`).format('hh:mm A')} WAT`;
    const updatedEvent = {
      ...event,
      id: eventId,
      date,
      time,
    };
    const url = 'http://localhost:8000/events';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    });

    dispatch(createEventSuccess(updatedEvent));
  } catch (e) {
    dispatch(createEventFail({ message: 'Unable to create event', code: 'events/create-fail' }));
  }
};

/** Clear Create Data */
const clearCreateData = () => ({
  type: CLEAR_CREATE_DATA,
});

/** FETCH EVENTS ACTIONS */
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

/** FETCH EVENTS THUNK */
const startFetchEvents = () => async (dispatch) => {
  dispatch(fetchEventsRequest());
  try {
    // Mock API call
    const response = await fetch('http://localhost:8000/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const events = await response.json();

    dispatch(fetchEventsSuccess(events));
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
  create: {
    error: false,
    loading: false,
    data: {},
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
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        create: {
          error: false,
          loading: true,
          data: {},
          errorData: null,
        },
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        create: {
          error: false,
          loading: false,
          data: action.payload,
          errorData: null,
        },
      };
    case CREATE_EVENT_FAIL:
      return {
        ...state,
        create: {
          ...state.create,
          error: true,
          loading: false,
          errorData: action.payload,
        },
      };
    case CLEAR_CREATE_DATA:
      return {
        ...state,
        create: {
          error: false,
          loading: false,
          data: {},
          errorData: null,
        },
      };
    default:
      return state;
  }
};

export {
  eventsReducer,
  clearCreateData,
  startFetchEvents,
  startCreateEvent,
};
