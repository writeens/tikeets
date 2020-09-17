import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { clearCreateData, startCreateEvent } from '../redux/events';
import Sidebar from './Sidebar';

const CreateEvent = () => {
  const {
    loading, data, error,
  } = useSelector((state) => state.events.create);
  const dispatch = useDispatch();

  /** Submit to Redux */
  const handleSubmit = (values, { resetForm }) => {
    dispatch(startCreateEvent(values));
    resetForm({ values: '' });
  };
  const formik = useFormik({
    initialValues: {
      image: '',
      date: '',
      title: '',
      time: '',
      organizer: '',
      link: '',
      shortDesc: '',
      longDesc: '',
      location: '',
    },
    onSubmit: handleSubmit,
  });

  // On Mount Clear Data Object
  useEffect(() => {
    dispatch(clearCreateData());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const dataExists = data ? data.id : null;
    if (!loading && !error && dataExists) {
      toast.success('Event Created', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // eslint-disable-next-line
  }, [data]);
  return (
    <div className="text-blue-900 bg-gray-100 flex flex-col min-h-screen">
      <Sidebar />
      <ToastContainer />
      <div className="mb-8 px-4 py-8 md:mx-32 lg:mx-64 flex flex-col bg-white shadow-xl rounded-md">
        <form method="post" className="flex flex-col" onSubmit={formik.handleSubmit}>
          <p className="text-center font-semibold text-3xl mb-8">Create Event</p>
          <div className="flex flex-col sm:flex-row sm:pb-8">
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                onChange={formik.handleChange}
                name="title"
                placeholder="Hangout at Afro Beach"
                className="text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.title}
                required
              />
            </div>
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="organizer">Organizer</label>
              <input
                type="text"
                onChange={formik.handleChange}
                name="organizer"
                placeholder="Jonathan King"
                className=" text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.organizer}
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:pb-8">
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="date">Date</label>
              <input
                type="date"
                onChange={formik.handleChange}
                name="date"
                className="text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.date}
                required
              />
            </div>
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="time">Time</label>
              <input
                type="time"
                onChange={formik.handleChange}
                name="time"
                className=" text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.time}
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:pb-8">
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                onChange={formik.handleChange}
                name="location"
                placeholder="e.g Online Event, Bulb HQ"
                className="text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.location}
                required
              />
            </div>
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="link">Link</label>
              <input
                type="text"
                onChange={formik.handleChange}
                name="link"
                placeholder="https://www.pace.africa"
                className=" text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.link}
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:pb-8">
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="shortDesc">Short Description</label>
              <input
                type="text"
                onChange={formik.handleChange}
                name="shortDesc"
                placeholder="An event with all the benefits of a great hangout"
                className="text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.shortDesc}
                required
              />
            </div>
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="image">Link to Image/Banner</label>
              <input
                type="text"
                onChange={formik.handleChange}
                name="image"
                placeholder="https://images.unsplash.com/photo-1551524612"
                className=" text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.image}
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:pb-8">
            <div className="flex flex-col mx-4 mb-4 sm:mb-0 flex-1">
              <label className="text-sm mb-2" htmlFor="longDesc">Long Description</label>
              <textarea
                type="text"
                onChange={formik.handleChange}
                name="longDesc"
                placeholder="An event with all the benefits of a great hangout"
                className=" h-40 text-sm bg-transparent rounded border-2 border-gray-400 p-2 focus:outline-none"
                value={formik.values.longDesc}
                required
              />
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="rounded mx-4 text-sm border-0 bg-blue-900 text-white py-2 px-8 self-end cursor-pointer"
          >
            {loading ? 'Creating' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
