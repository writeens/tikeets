/* eslint-disable react/prop-types */
import React, {
  Fragment, useEffect, useState,
} from 'react';
import { connect, useSelector } from 'react-redux';
import EventCard from './EventCard';
import Sidebar from './Sidebar';
import Loader from './Loader';
import { startFetchEvents } from '../redux/events';

const ReservedEvents = ({ fetchEvents, events = [], eventsFetchLoading }) => {
  const { tickets } = useSelector((state) => state.auth);
  // State
  const [allReservedEvents, setAllReservedEvents] = useState([]);

  /** Handler to fetch events */
  const getEvents = async () => {
    await fetchEvents();
  };

  // On Mount, Fetch Events
  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  // Listen for changes to events
  // Update State Accordingly
  useEffect(() => {
    if (events) {
      const reservedEventsId = tickets.map((item) => item.event);
      const reservedEventsDetails = events.filter((item) => reservedEventsId.includes(item.id));
      // Update View
      return setAllReservedEvents(reservedEventsDetails);
    }
    return setAllReservedEvents([]);
    // eslint-disable-next-line
  }, [events]);

  const renderContent = () => {
    if (eventsFetchLoading) {
      return <Loader small />;
    }

    return (
      <Fragment>
        {allReservedEvents.map((item) => (
          <EventCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            date={item.date}
            time={item.time}
          />
        ))}
      </Fragment>
    );
  };

  return (
    <div className="text-blue-900 bg-gray-100 flex flex-col min-h-screen">
      <Sidebar />
      <div className="md:mx-20 mx-4">
        <p className="text-center font-semibold text-3xl mb-8">Reserved Events</p>
        <div className="box-border flex flex-row flex-wrap justify-start">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.fetch.data,
  eventsFetchLoading: state.events.fetch.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(startFetchEvents()),
});

const connectedReservedEvents = connect(mapStateToProps, mapDispatchToProps)(ReservedEvents);
export default connectedReservedEvents;
