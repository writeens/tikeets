import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startFetchEvents } from '../redux/events';
import Sidebar from './Sidebar';

const EventDetail = () => {
  // Hooks
  const events = useSelector((state) => state.events.fetch.data);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Application State
  const [bg, setBg] = useState(null);
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');

  /** Handler to get Event Details and Update State */
  const getEventDetails = () => {
    const event = events.filter((item) => item.id === id)[0];
    if (event) {
      console.log(event);
      setBg(event.image);
      setTitle(event.title);
      setOrganizer(event.organizer);
    }
  };

  useEffect(() => {
    dispatch(startFetchEvents());
  }, []);

  useEffect(() => {
    getEventDetails();
  }, [id, events]);
  return (
    <div className="text-blue-900 relative bg-gray-100 flex flex-col min-h-screen">
      <Sidebar />
      <div className="flex flex-col">
        <div
          style={{ height: '500px', backgroundImage: `url(${bg})`, filter: 'blur(8px)' }}
          className=" z-0 w-full absolute bg-no-repeat bg-center bg-cover"
        >
          <div className="inset-0 h-full w-full bg-opacity-50 bg-black" />
          {id}
        </div>
        <div className="md:mx-32 lg:mx-48 mt-20 z-10 flex flex-col">
          <div className="flex md:flex-row flex-col">
            <img style={{ maxHeight: '450px' }} src={bg} alt="event" className="w-full md:w-2/3" />
            <div className="bg-gray-300 flex-col w-full flex justify-center content-center items-center md:h-64 h-full py-8 md:py-40">
              <p className="text-blue-900 font-bold text-center text-md">{title}</p>
              <p className="flex text-center font-medium text-gray-700 md:mb-16 mb-8">
                {`by ${organizer}`}
              </p>
              <button
                type="button"
                className="rounded text-sm border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer"
              >
                Reserve Ticket(s)

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
