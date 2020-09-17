import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';

const CreateEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  /** Submit to Redux */
  const handleSubmit = (values) => {

  };
  const formik = useFormik({
    initialValues: {

    },
    onSubmit: handleSubmit,
  });
  return (
    <div className="text-blue-900 bg-gray-100 flex flex-col min-h-screen">
      <Sidebar />

    </div>
  );
};

export default CreateEvent;
