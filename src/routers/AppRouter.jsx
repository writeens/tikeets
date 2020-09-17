import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import EventDetail from '../components/EventDetail';
import ReserveTicket from '../components/ReserveTicket';
import ReservedEvents from '../components/ReservedEvents';
import CreateEvent from '../components/CreateEvent';
import ViewTickets from '../components/ViewTickets';

// Routes Config
const routes = [
  {
    routePath: '/',
    routeComponent: Login,
    exact: true,
  },
  {
    routePath: '/home',
    routeComponent: Home,
    exact: true,
  },
  {
    routePath: '/myevents',
    routeComponent: ReservedEvents,
    exact: true,
  },
  {
    routePath: '/event/:id',
    routeComponent: EventDetail,
    exact: true,
  },
  {
    routePath: '/events/create',
    routeComponent: CreateEvent,
    exact: true,
  },
  {
    routePath: '/event/:id/reserve',
    routeComponent: ReserveTicket,
    exact: true,
  },
  {
    routePath: '/event/:id/tickets',
    routeComponent: ViewTickets,
    exact: true,
  },
];

const AppRouter = () => (
  <Switch>
    {routes.map(({ routePath, routeComponent, exact }) => (
      <Route
        key={`${routePath}`}
        path={routePath}
        component={routeComponent}
        exact={exact}
      />
    ))}
  </Switch>
);

export default AppRouter;
