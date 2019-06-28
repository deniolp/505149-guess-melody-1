import * as React from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

const withPrivateRoutes = function (Component) {
  function withProps(props) {
    const {isAuthorizationRequired} = props;
    if (isAuthorizationRequired) {
      return <Redirect to="/sign-in" />;
    }

    return <Component {...props} />;
  }

  return withProps;
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state)
});

export default compose(connect(mapStateToProps, null), withPrivateRoutes);
