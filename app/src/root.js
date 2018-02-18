import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './layouts/App';
import PostDetailView from './layouts/PostDetailView';
import NotFoundView from "./layouts/NotFoundView";

const Root = ({store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/error" component={NotFoundView}/>
        <Route path="/:category/:post_id" component={PostDetailView}/>
        <Route path="/" component={App}/>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
