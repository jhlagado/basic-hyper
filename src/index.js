import { hyper } from "hyperhtml";
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import { initApp } from './app.js';

initApp(hyper, window);
