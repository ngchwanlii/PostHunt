import React from 'react';
import './NotFoundView.less';
import { Col, message, Row } from 'antd';
import { connect } from 'react-redux';
import { delay } from '../utils';
import { Redirect } from 'react-router-dom';
import { errorActions } from '../actions';

class NotFoundView extends React.Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    const { error, redirectNeeded, redirectMessage, onClearError } = this.props;

    this.redirectElement = null;
    this.errorElement = error ? message.error(error, 1) : null;

    if (redirectNeeded) {
      this.redirectElement = message.loading(redirectMessage, 1);
      delay(2200).then(res => {
        onClearError();
        this.setState({ redirect: true });
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { error, redirectMessage, redirectNeeded, onClearError } = this.props;
    if (error && error !== prevProps.error) {
      this.errorElement = message.error(error);
    }
    if (redirectNeeded && redirectMessage !== prevProps.redirectMessage) {
      this.redirectElement = message.loading(redirectMessage, 1);
      delay(2200).then(res => {
        onClearError();
        this.setState({ redirect: true });
      });
    }
  }

  render() {
    const { redirect } = this.state;
    const { location, errorDetail } = this.props;
    const ErrorMessage = () => <div ref={el => (this.errorElement = el)} />;
    const RedirectMessage = () => (
      <div ref={el => (this.redirectElement = el)} />
    );

    if (redirect) {
      return <Redirect to={location.next} />;
    }
    return (
      <div className="bg-404-container">
        <ErrorMessage />
        <RedirectMessage />
        <Row type="flex" align="middle" className="bg-404-container-row">
          <Col xs={12}>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
              alt=""
            />
          </Col>
          <Col xs={12}>
            {errorDetail ? <h1>{errorDetail}</h1> : <h1>Not Found</h1>}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    globalError,
    redirectNeeded,
    redirectMessage,
    errorDetail,
  } = state.errorReducers;
  return {
    error: globalError,
    errorDetail,
    redirectNeeded,
    redirectMessage,
  };
};

export default connect(mapStateToProps, {
  onClearError: errorActions.resetGlobalError,
})(NotFoundView);
