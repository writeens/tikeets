import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { reserveTickets } from '../helpers/api';
import range from '../helpers/helpers';
import { refreshAuth } from '../redux/auth';
import { startFetchEvents } from '../redux/events';
import Sidebar from './Sidebar';

const ReserveTicket = () => {
  const events = useSelector((state) => state.events.fetch.data);
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [bg, setBg] = useState(null);
  const [title, setTitle] = useState('');
  const [inputBoxes, setInputBoxes] = useState(1);

  /** Handle Reserve Tickets/API call to email service and BE */
  const handleReserveTickets = async (values, { resetForm }) => {
    const event = events.find((item) => item.id === id);
    const emails = Object.values(values);
    const ticketData = {
      id: event.id,
      attendees: emails.filter((item) => item),
      uid,
    };

    try {
      // Reserve Tickets
      await reserveTickets(ticketData);

      // Notify User
      toast.success(`${ticketData.attendees.length} ticket(s) reserved`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      resetForm({ values: '' });

      dispatch(refreshAuth());
    } catch (e) {
      toast.warn('Unable to reserve tickets', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email1: '',
      email2: '',
      email3: '',
      email4: '',
      email5: '',
    },
    onSubmit: handleReserveTickets,
  });

  useEffect(() => {
    if (events.length <= 0) {
      dispatch(startFetchEvents());
    }
  }, []);

  /** Handler to get Event Details and Update local State */
  const getEventDetails = () => {
    const event = events.filter((item) => item.id === id)[0];
    if (event) {
      setBg(event.image);
      setTitle(event.title);
    }
  };

  /** Handle Select */
  const handleSelect = (e) => {
    const { value } = e.target;
    setInputBoxes(value);
  };

  useEffect(() => {
    getEventDetails();
  }, [events]);

  const renderInputBoxes = () => {
    const inputArray = range(1, inputBoxes);

    return (
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        {inputArray.map((item) => (
          <div key={item} className="mb-2 flex-col flex">
            <label className="text-xs mb-2">{`Email Address of Attendee # ${item}`}</label>
            <input
              className="text-xs placeholder-gray-500 pl-4 py-2 focus:outline-none"
              type="email"
              placeholder="Email Address"
              name={`email${item}`}
              value={formik.values[`email${item}`]}
              onChange={formik.handleChange}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="rounded text-sm border-0 bg-blue-900 text-white py-2 px-8 self-end cursor-pointer mt-12"
        >
          Reserve

        </button>
      </form>
    );
  };

  return (
    <div className="text-blue-900 relative bg-gray-100 flex flex-col min-h-screen">
      <Sidebar />
      <ToastContainer />
      <div className="md:mx-32 lg:mx-64 flex-col flex">
        <img style={{ height: '300px', minHeight: '300px' }} className="md:w-1/2 self-center mb-3" src={bg} alt="event" />
        <div className="flex flex-col bg-white p-6 shadow-xl rounded">
          <p className="text-center mb-8 font-bold">{title}</p>
          <div className="flex-row flex justify-between w-4/5 self-center mb-8">
            <div className="flex flex-col">
              <p className="text-blue-900 text-lg font-bold mb-2">General Admission</p>
              <p className="text-gray-500 text-sm font-medium">*Max of 5 bookings per event</p>
            </div>
            <select onChange={handleSelect}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="flex-col flex w-4/5 self-center">
            <p className="text-blue-900 text-lg font-bold mb-4">Attendees</p>
            {renderInputBoxes()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveTicket;
