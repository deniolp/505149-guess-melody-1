import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

const withPrivateRoutes = function (Component) {
  function withProps(props) {
    if (props.isAuthorizationRequired) {
      return <Redirect to="/sign-in" />;
    }

    return <Component {...props} />;
  }

  withProps.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired
  };

  return withProps;
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state)
});

export default compose(connect(mapStateToProps, null), withPrivateRoutes);
