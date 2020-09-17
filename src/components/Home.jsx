import React, { Fragment, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import EventCard from './EventCard';
import Sidebar from './Sidebar';
import Loader from './Loader';
import { startFetchEvents } from '../redux/events';

const Home = ({ fetchEvents, events, eventsFetchLoading }) => {
  const { firstName } = useSelector((state) => state.auth);
  // State
  const [allUpcomingEvents, setAllUpcomingEvents] = useState([]);

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
      return setAllUpcomingEvents(events);
    }
    return setAllUpcomingEvents([]);
  }, [events]);

  const renderContent = () => {
    if (eventsFetchLoading) {
      return <Loader small />;
    }

    return (
      <Fragment>
        {allUpcomingEvents.map((item) => (
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
        <p>{`Hello, ${firstName}`}</p>
        <p className="text-center font-semibold text-3xl mb-8">Upcoming Events</p>
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

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default connectedHome;
