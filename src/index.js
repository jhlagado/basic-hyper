import 'document-register-element'
import h from 'hyperhtml-element/esm';

global.HyperHTMLElement = h;

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import('./app').then(app => app.initApp());
