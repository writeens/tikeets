import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { startFetchEvents } from '../redux/events';
import Sidebar from './Sidebar';

const EventDetail = () => {
  // Hooks
  const events = useSelector((state) => state.events.fetch.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // Application State
  const [bg, setBg] = useState(null);
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [location, setLocation] = useState('');

  /** Handler to get Event Details and Update State */
  const getEventDetails = () => {
    const event = events.filter((item) => item.id === id)[0];
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
  const handleClick = () => {
    history.push(`/event/${id}/reserve`);
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
          <div className="flex md:flex-row flex-col mb-4">
            <img style={{ maxHeight: '450px' }} src={bg} alt="event" className="w-full md:w-2/3" />
            <div className="bg-white flex-col w-full flex justify-center content-center items-center md:h-64 h-full py-8 md:py-40 shadow-xl rounded-sm">
              <p className="text-blue-900 font-bold text-center text-md">{title}</p>
              <p className="flex text-center font-medium text-gray-700 md:mb-16 mb-8">
                {`by ${organizer}`}
              </p>
              <button
                type="button"
                className="rounded text-sm border-0 bg-blue-900 text-white py-2 px-8 cursor-pointer"
                onClick={handleClick}
              >
                Reserve Ticket(s)

              </button>
            </div>
          </div>
          <div className="flex flex-col bg-white p-12 shadow-xl rounded">
            <div className="flex justify-between mb-8">
              <p className="w-3/5 text-sm font-medium">{shortDesc}</p>
              <div className="w-1/3">
                <p className="text-lg font-bold">Location</p>
                <p className="text-sm font-medium">{location}</p>
              </div>
            </div>
            <div className="text-gray-600">
              <p className="text-blue-900 text-lg font-bold mb-4">About Event</p>
              <p className="mb-8">{longDesc}</p>
              <p className="text-lg font-bold text-blue-900 mb-4">Event Link</p>
              <a className="text-blue-500" href={eventLink}>{eventLink}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
