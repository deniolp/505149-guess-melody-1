import React from 'react';

const withTransformedProps = (transformFunc) => (Component) => {
  const WithTransformedProps = (props) => {
    const newProps = transformFunc(props);
    return <Component
      {...newProps}
    />;
  };
  return WithTransformedProps;
};

export default withTransformedProps;
