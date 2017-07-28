import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isUserAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (isUserAuth === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({ isUserAuth: state.user, ...ownProps });

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));
