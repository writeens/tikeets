import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import EventDetail from '../components/EventDetail';

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
    routePath: '/event/:id',
    routeComponent: EventDetail,
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
