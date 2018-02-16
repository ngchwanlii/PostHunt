import React from 'react';
import {Icon, Layout} from 'antd';
const { Footer } = Layout;

export const AppFooter = props => (
  <Footer style={{ textAlign: 'center' }}>
    Copyright <Icon type="copyright" /> 2018 PostHunt
  </Footer>
);
