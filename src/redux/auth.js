import shortid from 'shortid';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL,
  CLEAR_ERROR,
} from './constants';

/** SIGN UP ACTIONS */
const signUpRequest = () => ({
  type: SIGN_UP_REQUEST,
});
const signUpSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  payload: user,
});
const signUpFail = (e) => ({
  type: SIGN_UP_FAIL,
  payload: e,
});

/** Sign Up Thunk */
const startSignUp = (user) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const url = 'http://localhost:8000/users';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const users = await response.json();

    // Check for Email
    const userExists = users.findIndex((item) => item.email === user.email);
    if (userExists !== -1) {
      return dispatch(signUpFail({ message: 'Unable to sign up', code: 'auth/email-exists' }));
    }

    const newUser = user;
    // Generate UID for user
    const uid = shortid.generate();
    newUser.uid = uid;
    newUser.role = 'user';

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    dispatch(signUpSuccess(newUser));
  } catch (e) {
    dispatch(signUpFail({ message: 'Unable to sign up', code: 'auth/signup-fail' }));
  }
};

/** SIGN IN ACTIONS */
const signInRequest = () => ({
  type: SIGN_IN_REQUEST,
});
const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
});
const signInFail = (e) => ({
  type: SIGN_IN_FAIL,
  payload: e,
});

/** Sign Up Thunk */
const startSignIn = (user) => async (dispatch) => {
  dispatch(signInRequest());
  try {
    const url = 'http://localhost:8000/users';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const users = await response.json();
    // Check for Email
    const newUser = users.find((item) => item.email === user.email);

    if (!newUser) {
      console.log('object');
      return dispatch(signInFail({ message: 'Unable to sign in', code: 'auth/email-does-not-exist' }));
    }

    // Check for Password
    if (newUser.password !== user.password) {
      return dispatch(signInFail({ message: 'Unable to sign in', code: 'auth/invalid-password' }));
    }

    dispatch(signInSuccess(newUser));
  } catch (e) {
    dispatch(signInFail({ message: 'Unable to sign in', code: 'auth/signin-fail' }));
  }
};

/** SIGN OUT ACTIONS */
const signOutRequest = () => ({
  type: SIGN_OUT_REQUEST,
});
const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});
const signOutFail = (e) => ({
  type: SIGN_OUT_FAIL,
  payload: e,
});

/** Sign Out Thunk */
const startSignOut = () => async (dispatch) => {
  dispatch(signOutRequest());
  try {
    dispatch(signOutSuccess());
  } catch (e) {
    dispatch(signOutFail({ message: 'Unable to sign out', code: 'auth/signout-fail' }));
  }
};

const clearError = (e) => ({
  type: CLEAR_ERROR,
});
const defaultAuthState = {
  uid: '',
  email: '',
  firstName: '',
  lastName: '',
  loading: false,
  error: false,
  errorData: '',
  role: '',
};

const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        uid: null,
        email: '',
        firstName: '',
        lastName: '',
        loading: true,
        error: false,
        errorData: '',
      };
    case SIGN_UP_SUCCESS:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role,
        loading: false,
        error: false,
        errorData: '',
      };
    case SIGN_UP_FAIL:
      return {
        uid: '',
        email: '',
        firstName: '',
        lastName: '',
        loading: false,
        error: true,
        errorData: action.payload,
      };
    case SIGN_OUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        uid: '',
        email: '',
        firstName: '',
        lastName: '',
        loading: false,
        error: false,
        errorData: '',
      };
    case SIGN_OUT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorData: action.payload,
      };
    case SIGN_IN_REQUEST:
      return {
        uid: null,
        email: '',
        firstName: '',
        lastName: '',
        loading: true,
        error: false,
        errorData: '',
      };
    case SIGN_IN_SUCCESS:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role,
        loading: false,
        error: false,
        errorData: '',
      };
    case SIGN_IN_FAIL:
      return {
        uid: '',
        email: '',
        firstName: '',
        lastName: '',
        loading: false,
        error: true,
        errorData: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: false,
        errorData: '',
      };
    default:
      return state;
  }
};

export {
  startSignUp,
  startSignOut,
  startSignIn,
  clearError,
  authReducer,
};
