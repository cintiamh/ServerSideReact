import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import { RouteConfig } from 'react-router-config';

const routeConfig: RouteConfig[] = [
    {
        ...HomePage,
        path: '/',
        exact: true
    },
    {
        ...UsersListPage,
        path: '/users'
    }
];

export default routeConfig;
