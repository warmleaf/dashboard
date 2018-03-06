import 'default-passive-events';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './lib/registerServiceWorker';
import App from './app';

registerServiceWorker();

if (window !== 'undefined') {
  ReactDOM.render(createElement(App), window.document.getElementById('root'));
}
