/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { startSignIn } from '../redux/auth';

const SignInForm = () => {
  const {
    error, errorData, uid, loading,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (values) => {
    dispatch(startSignIn(values));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (error) {
      switch (errorData.code) {
        case 'auth/invalid-password':
          toast.warn('Invalid Credentials provided', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        default:
          toast.warn('Unable to sign in', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
    }
  }, [error]);

  useEffect(() => {
    if (uid && !loading && !error) {
      history.replace('/home');
    }
  }, [uid]);
  return (
    <div className="flex flex-col">
      <form method="post" onSubmit={formik.handleSubmit}>
        <div className=" text-blue-900 flex-col flex mb-4 lg:mb-10">
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-10">
            <label htmlFor="firstName" className=" font-medium">Email</label>
            <input
              data-testid="sign-in-email"
              type="text"
              onChange={formik.handleChange}
              name="email"
              placeholder="Enter Email Address"
              className=" bg-transparent border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.email}
              required
            />
          </div>
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-10">
            <label htmlFor="lastName" className=" font-medium">Password</label>
            <input
              data-testid="sign-in-password"
              type="password"
              onChange={formik.handleChange}
              placeholder="Enter Password"
              name="password"
              className="bg-transparent border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.password}
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-16">
          <button type="submit" className="rounded border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer">Sign In</button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default SignInForm;
