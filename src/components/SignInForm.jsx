/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';

const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      password: '',
      phone: '',
    },
  });
  return (
    <div className="flex flex-col">
      <form>
        <div className=" text-blue-900 flex-col flex mb-4 lg:mb-10">
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-10">
            <label htmlFor="firstName" className=" font-medium">Email</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="email"
              className="border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.email}
            />
          </div>
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-10">
            <label htmlFor="lastName" className=" font-medium">Password</label>
            <input
              type="password"
              onChange={formik.handleChange}
              name="password"
              className="border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.password}
            />
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <button type="submit" className="rounded border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
