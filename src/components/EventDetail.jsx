import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { cancelTickets, deleteEvent } from '../helpers/api';
import { refreshAuth } from '../redux/auth';
import { startFetchEvents } from '../redux/events';
import Sidebar from './Sidebar';

const EventDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // Hooks
  const events = useSelector((state) => state.events.fetch.data);
  const event = events.filter((item) => item.id === id)[0];
  const { role, tickets, uid } = useSelector((state) => state.auth);

  // Application State
  const [bg, setBg] = useState(null);
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [location, setLocation] = useState('');
  const [showCancelButton, setShowCancelButton] = useState(false);

  /** Handler to get Event Details and Update State */
  const getEventDetails = () => {
    if (event) {
      setBg(event.image);
      setTitle(event.title);
      setOrganizer(event.organizer);
      setEventLink(event.link);
      setLongDesc(event.longDesc);
      setShortDesc(event.shortDesc);
      setLocation(event.location);
    }
  };

  /** Navigate to Reserve Tickets page */
  const handleReserveTickets = () => {
    history.push(`/event/${id}/reserve`);
  };

  /** Cancel Reservations */
  const handleCancelReservations = async () => {
    try {
      await cancelTickets(uid, id);
      // Notify User
      toast.success('Reservations canceled', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(refreshAuth());
    } catch (e) {
      console.log(e);
    }
  };

  /** Delete Event */
  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(event.id);
      // Notify User
      toast.success('Reservations canceled', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      history.goBack();
    } catch (e) {
      console.log(e);
      toast.warn('Unable to delete event', {
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

  useEffect(() => {
    dispatch(startFetchEvents());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getEventDetails();
    // eslint-disable-next-line
  }, [id, events]);

  useEffect(() => {
    if (tickets.length > 0 && event) {
      const ticketIndex = tickets.findIndex((item) => item.event === event.id);
      if (ticketIndex > -1) {
        return setShowCancelButton(true);
      }
      return setShowCancelButton(false);
    }
    // eslint-disable-next-line
  }, [tickets, events]);

  const renderTickets = () => {

  };

  return (
    <div className="text-blue-900 relative bg-gray-100 flex flex-col min-h-screen">
      <Sidebar />
      <ToastContainer />
      <div className="flex flex-col">
        <div
          style={{ height: '500px', backgroundImage: `url(${bg})`, filter: 'blur(8px)' }}
          className=" z-0 w-full absolute bg-no-repeat bg-center bg-cover"
        >
          <div className="inset-0 h-full w-full bg-opacity-50 bg-black" />
          {id}
        </div>
        <div className="md:mx-32 lg:mx-48 mt-20 z-10 flex flex-col">
          <div className="flex md:flex-row flex-col mb-4 w-full">
            <img style={{ maxHeight: '450px' }} src={bg} alt="event" className=" flex flex-1 w-full md:w-3/4" />
            <div className="bg-white flex-col w-full md:w-2/5 flex justify-center content-center items-center md:h-64 h-full py-8 md:py-40 shadow-xl rounded-sm">
              <p className="text-blue-900 font-bold text-center text-md">{title}</p>
              <p className="flex text-center font-medium text-gray-700 md:mb-16 mb-8">
                {`by ${organizer}`}
              </p>
              {role === 'user' && (
                <button
                  type="button"
                  className="rounded text-sm mb-6 border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer"
                  onClick={handleReserveTickets}
                >
                  Reserve Ticket(s)

                </button>
              )}
              {showCancelButton && (
                <button
                  type="button"
                  className="rounded text-sm border-0 bg-red-600 text-white py-2 px-8 cursor-pointer"
                  onClick={handleCancelReservations}
                >
                  Cancel Reservation(s)

                </button>
              )}
            </div>
          </div>
          <div className="flex mb-8 flex-col bg-white p-12 shadow-xl rounded">
            <div className="flex justify-between mb-8">
              <p className="w-3/5 text-sm font-medium">{shortDesc}</p>
              <div className="w-1/3">
                <p className="text-lg font-bold">Location</p>
                <p className="text-sm font-medium">{location}</p>
              </div>
            </div>
            <div className="text-gray-600 mb-8">
              <p className="text-blue-900 text-lg font-bold mb-4">About Event</p>
              <p className="mb-8">{longDesc}</p>
              <p className="text-lg font-bold text-blue-900 mb-4">Event Link</p>
              <a className="text-blue-500" href={eventLink}>{eventLink}</a>
            </div>
            <div className="flex flex-1 justify-center sm:justify-end">
              {
              role === 'admin' && (
                <button
                  onClick={() => history.push(`/event/${id}/tickets`)}
                  type="button"
                  className="rounded mr-6 text-sm border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer"
                >
                  View Tickets
                </button>
              )
            }
              {
              role === 'admin' && (
                <button
                  onClick={handleDeleteEvent}
                  type="button"
                  className="rounded text-sm border-0 bg-red-600 text-white py-2 px-8 cursor-pointer"
                >
                  Delete Event
                </button>
              )
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
