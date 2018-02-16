import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import Root from './root';
import registerServiceWorker from './registerServiceWorker';
import './index.less';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
