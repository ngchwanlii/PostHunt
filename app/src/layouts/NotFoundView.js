import React from 'react';
import './NotFoundView.less';
import { Col, Row } from 'antd';

const NotFoundView = () => (
  <div className="bg-404-container">
    <Row type="flex" align="middle" className="bg-404-container-row">
      <Col xs={12}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
          alt=""
        />
      </Col>
      <Col xs={12}>
        <h1>404 Page!</h1>
      </Col>
    </Row>
  </div>
);

export default NotFoundView;
