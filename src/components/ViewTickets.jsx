/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventTickets } from '../helpers/api';
import { startFetchEvents } from '../redux/events';
import Loader from './Loader';
import Sidebar from './Sidebar';

const Ticket = ({ name, attendees, id }) => (
  <div className="shadow-xl m-4 p-2 rounded border-gray-200 border-2 mb-4">
    <p className="font-bold text-center">
      {name}
    </p>
    <p className="text-center">for</p>
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center">
      {attendees.map((item) => <p className=" self-center p-2 px-4 bg-blue-700 text-white rounded m-2" key={`${id}-${item}`}>{item}</p>)}
    </div>
    <div />
  </div>
);

const ViewTickets = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.fetch.data);

  // State
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [usersArray, setUsersArray] = useState([]);
  const [title, setTitle] = useState('');

  const getTickets = async () => {
    setLoading(true);
    const users = await getEventTickets(id);
    setLoading(false);
    if (users.length <= 0) {
      return setShowMessage(true);
    }
    setUsersArray(users);
  };

  // On Mount
  useEffect(() => {
    dispatch(startFetchEvents());
    getTickets();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const event = events.find((item) => item.id === id);
      setTitle(event.title);
    }
  }, [events]);

  const renderTickets = () => {
    if (loading) {
      return <Loader small />;
    }

    if (!loading && showMessage) {
      return (
        <p className="text-center font-bold text-md">No tickets have been reserved yet</p>
      );
    }

    console.log(usersArray);
    if (!loading && !showMessage && usersArray.length > 0) {
      return (
        <Fragment>
          {usersArray.map((item) => (
            <Ticket
              key={item.id}
              id={item.id}
              name={item.name}
              attendees={item.attendees}
            />
          ))}
        </Fragment>
      );
    }
  };

  return (
    <div className="text-blue-900 bg-gray-100 flex flex-col min-h-screen">
      <Sidebar />
      <div style={{ minHeight: '50vh' }} className=" relative mb-8 px-4 py-8 md:mx-32 lg:mx-64 flex flex-col bg-white">
        <p className="text-center text-blue-900 text-lg font-bold mb-4">{title}</p>
        {renderTickets()}
      </div>
    </div>
  );
};

export default ViewTickets;
