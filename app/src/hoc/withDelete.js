import React from 'react';
import { connect } from 'react-redux';
import { commonActions } from '../actions/common-actions';

export const withDelete = Component => {
  class DeleteWrapper extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(null, {
    onDelete: commonActions.remove,
  })(DeleteWrapper);
};
