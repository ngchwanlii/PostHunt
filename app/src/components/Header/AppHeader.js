import React from 'react'
import './AppHeader.less'
import {Layout} from "antd";
import {Link} from "react-router-dom";
const {Header} = Layout

const AppLogo = ({title, logo}) => (
  <Link to="/">
    <div className="logo">
      {logo}
      <h1>{title}</h1>
    </div>
  </Link>
);

const appData = {
  title: 'PostHunt',
  logo: (
    <img alt='' src="https://png.icons8.com/nolan/96/000000/unchecked-circle.png"/>
  ),
}
export const AppHeader = (props) => {
  return (
    <Header className="app-header">
      <AppLogo title={appData.title} logo={appData.logo}/>
    </Header>
  )
}
