/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';

const SignUpForm = () => {
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
        <div className=" text-blue-900  lg:flex-row flex-col flex mb-4 lg:mb-10">
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
            <label htmlFor="firstName" className=" font-medium">First Name</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="firstName"
              className="border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.email}
            />
          </div>
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
            <label htmlFor="lastName" className=" font-medium">Last Name</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="lastName"
              className="border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.lastName}
            />
          </div>
        </div>
        <div className="text-blue-900  lg:flex-row flex-col flex mb-4 lg:mb-10">
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
            <label htmlFor="firstName" className=" font-medium">Email</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="email"
              className="border-0 border-b-2 border-blue-900 p-2 focus:outline-none"
              value={formik.values.email}
            />
          </div>
          <div className="flex flex-col flex-1 lg:mr-6 lg:ml-6 mb-4 lg:mb-0">
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
          <button type="submit" className="rounded border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer">Get Started</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
