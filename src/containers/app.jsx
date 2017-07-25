import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Landing from './landing';
import NavBar from './navbar';
import Search from './search';
import Dashboard from './dashboard';
import PrivateRoute from './privateRoute';
import JobInProgress from './jobinprogress';
import store from '../store/store';
import ContactInfo from '../components/jobInProgress/ContactInfo';
import '../styles/css/mui.css';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <NavBar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/search" component={Search} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/contacts" component={ContactInfo} />
      <PrivateRoute path="/jobs/:id" component={JobInProgress} />

    </div>
  </Provider >
);

export default App;
