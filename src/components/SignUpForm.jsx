/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { startSignUp } from '../redux/auth';

const SignUpForm = () => {
  const {
    loading, error, errorData, uid,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  /** Handler for submission */
  const handleSubmit = async (values) => {
    await dispatch(startSignUp(values));
  };

  // Formik to handle forms
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (uid && !loading && !error) {
      history.replace('/home');
    }
  }, [uid]);

  useEffect(() => {
    if (error) {
      switch (errorData.code) {
        case 'auth/email-exists':
          toast.warn('This email belongs to another user', {
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

  return (
    <div className="flex flex-col py-8 md:py-0">
      <form method="post" onSubmit={formik.handleSubmit}>
        <div className=" text-blue-900  lg:flex-row flex-col flex mb-4 lg:mb-10">
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
            <label htmlFor="firstName" className=" font-medium">First Name</label>
            <input
              data-testid="sign-up-firstname"
              type="text"
              placeholder="First Name"
              onChange={formik.handleChange}
              name="firstName"
              className="bg-transparent border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.firstName}
              required
            />
          </div>
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
            <label htmlFor="lastName" className=" font-medium">Last Name</label>
            <input
              data-testid="sign-up-lastname"
              type="text"
              placeholder="Last Name"
              onChange={formik.handleChange}
              name="lastName"
              className="bg-transparent border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.lastName}
              required
            />
          </div>
        </div>
        <div className="text-blue-900  lg:flex-row flex-col flex mb-4 lg:mb-10">
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
            <label htmlFor="email" className=" font-medium">Email</label>
            <input
              data-testid="sign-up-email"
              type="text"
              placeholder="Enter Email Address"
              onChange={formik.handleChange}
              name="email"
              className="bg-transparent border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.email}
              required
            />
          </div>
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
            <label htmlFor="password" className=" font-medium">Password</label>
            <input
              data-testid="sign-up-password"
              type="password"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              name="password"
              className="bg-transparent border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.password}
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-16">
          <button type="submit" className="rounded border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer">Get Started</button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default SignUpForm;
