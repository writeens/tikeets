/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import MenuIcon from '../assets/menu.svg';
import { startSignOut } from '../redux/auth';

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [route, setRoute] = useState('');
  const [mobile, setMobile] = useState(false);

  /** Handle User Sign Out */
  const handleSignOut = async () => {
    await dispatch(startSignOut());
    history.replace('/');
  };

  /** Show SubMenu */
  const showSubMenu = () => {
    setMobile(!mobile);
  };

  useEffect(() => {
    const singleRoute = location.pathname;
    setRoute(singleRoute);
  }, [location]);
  return (
    <div className=" relative h-16 flex bg-gray-100 justify-between px-4 py-3 mb-8">
      <p
        onClick={() => history.replace('/home')}
        className="flex font-bold cursor-pointer text-blue-900 text-2xl"
      >
        Tikeets

      </p>
      <div className="items-center text-xs mr-4 hidden md:flex">
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
      <img
        onClick={showSubMenu}
        className="cursor-pointer w-8 h-8 flex md:hidden"
        src={MenuIcon}
        alt="hamburger"
      />

      <div style={{ top: '4rem' }} className={`${mobile ? 'h-48' : 'h-0'} z-20 absolute bg-gray-100 px-4 flex md:hidden justify-around items-start flex-col inset-x-0 bottom-0`}>
        <p
          onClick={() => history.replace('/home')}
          className={`${route === '/home' ? 'border-blue-600' : 'border-white'} ${mobile ? 'flex' : 'hidden'} cursor-pointer pb-2 mx-2 mr-4 border-b-2 hover:border-blue-600`}
        >
          Upcoming Events

        </p>
        {
      role === 'user' && (
      <p
        onClick={() => history.replace('/myevents')}
        className={`${route === '/myevents' ? 'border-blue-600' : 'border-white'} ${mobile ? 'flex' : 'hidden'} cursor-pointer pb-2 mx-2 border-b-2 hover:border-blue-600`}
      >
        Reserved Events

      </p>
      )
    }
        {
      role === 'admin' && (
      <p
        onClick={() => history.push('/events/create')}
        className={`${route === '/events/create' ? 'border-blue-600' : 'border-white'} ${mobile ? 'flex' : 'hidden'} cursor-pointer pb-2 mx-2 border-b-2 hover:border-blue-600`}
      >
        Create Event

      </p>
      )
    }
        <p
          onClick={handleSignOut}
          className={`cursor-pointer pb-2 mx-2 border-b-2 ${mobile ? 'flex' : 'hidden'} hover:border-blue-600`}
        >
          Sign Out

        </p>
      </div>
    </div>
  );
};

export default Sidebar;
