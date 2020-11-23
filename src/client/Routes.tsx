import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

export default () => {
	return(
		<div>
            <Route exact path="/" component={HomePage} />
            <Route path="/users" component={UsersListPage} />
		</div>
	);
};