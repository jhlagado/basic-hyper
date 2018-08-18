import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

import { initController } from './controllers/todo';
import { initStorage } from './models/storage';
import './elements';

const hyper = HyperHTMLElement.hyper;

const storage = initStorage(window.localStorage);
const controller = initController(window, storage);
const data = { controller, hyper };
const appRender = hyper(window.document.querySelector('#todoapp'));

appRender`<my-container data=${data}></my-container>`;
controller.update(); 
