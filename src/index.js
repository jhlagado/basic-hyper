import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import { initApp } from './app.js';

const hyper = HyperHTMLElement.hyper;

initApp(hyper, window);

