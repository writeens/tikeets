/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { startSignOut } from '../redux/auth';

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [route, setRoute] = useState('');

  const handleSignOut = async () => {
    await dispatch(startSignOut());
    history.replace('/');
  };

  useEffect(() => {
    const singleRoute = location.pathname;
    setRoute(singleRoute);
  }, [location]);
  return (
    <div className="flex bg-gray-100 justify-between px-4 py-3 mb-8">
      <p
        onClick={() => history.replace('/home')}
        className="flex font-bold cursor-pointer text-blue-900 text-2xl"
      >
        Tikeets

      </p>
      <div className="flex items-center text-xs mr-4">
        <p
          onClick={() => history.replace('/home')}
          className={`${route === '/home' ? 'border-blue-600' : 'border-white'} cursor-pointer pb-2 mx-2 mr-4 border-b-2 hover:border-blue-600`}
        >
          Upcoming Events

        </p>
        {
          role === 'user' && (
          <p
            onClick={() => history.replace('/myevents')}
            className={`${route === '/myevents' ? 'border-blue-600' : 'border-white'} cursor-pointer pb-2 mx-2 border-b-2 hover:border-blue-600`}
          >
            Reserved Events

          </p>
          )
        }
        {
          role === 'admin' && (
          <p
            onClick={() => history.push('/events/create')}
            className={`${route === '/events/create' ? 'border-blue-600' : 'border-white'} cursor-pointer pb-2 mx-2 border-b-2 hover:border-blue-600`}
          >
            Create Event

          </p>
          )
        }
        <p
          onClick={handleSignOut}
          className="cursor-pointer pb-2 mx-2 border-b-2 hover:border-blue-600"
        >
          Sign Out

        </p>
      </div>
    </div>
  );
};

export default Sidebar;
