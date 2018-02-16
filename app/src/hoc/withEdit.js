import React from 'react';
import { connect } from 'react-redux';
import { commonActions } from '../actions/common-actions';

export const withEdit = Component =>  {
  class EditWrapper extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onEdit: (id, param, dataType) => {
        dispatch(commonActions.edit(id, param, dataType))
      },
    };
  };

  return connect(null, mapDispatchToProps)(EditWrapper);
};
