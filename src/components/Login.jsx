import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  /** Switch between sign in and sign up forms */
  const toggleView = (viewClicked) => {
    if (viewClicked === 'signUp') {
      return setShowSignUp(true);
    }
    return setShowSignUp(false);
  };
  return (
    <div className="flex bg-gray-100 flex-row absolute inset-0">
      <div className="w-2/5 flex flex-col justify-center items-center">
        <p className="my-4 text-6xl font-bold text-blue-900">Tikeets</p>
        <p className="text-center text-blue-900">A ticket booking/reservation and event management platform.</p>
      </div>
      <div className="w-3/5 flex-col flex justify-center">
        <div className="text-blue-900 flex self-center justify-around mt-4 sm:w-1/2 w-1/2 mb-16">
          <button
            type="button"
            className={`cursor-pointer ${!showSignUp ? 'border-blue-900' : 'border-white-900'} border-0 border-b-4 mx-3 pb-1 text-xl px-2 focus:outline-none`}
            onClick={() => toggleView('signIn')}
          >
            Sign In

          </button>
          <button
            type="button"
            className={`cursor-pointer ${showSignUp ? 'border-blue-900' : 'border-white-900'} border-0 border-b-4 mx-3 pb-1 text-xl px-2 focus:outline-none`}
            onClick={() => toggleView('signUp')}
          >
            Sign Up

          </button>
        </div>
        {showSignUp && (
          <div className="mx-32">
            <SignUpForm />
          </div>
        )}
        {!showSignUp && (
          <div className="mx-32">
            <SignInForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
