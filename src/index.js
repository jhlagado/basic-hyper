import hyper from 'hyperhtml';
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

import controller from './controllers/todo';
import storage from './models/storage';
import updateHeader from './views/header';
import updateMain from './views/main';
import updateFooter from './views/footer';

const header = hyper();
const main = hyper();
const footer = hyper();
const appRender = hyper(document.querySelector('.todoapp'));

controller.init(storage, todos => {
	appRender`${[
		updateHeader(header, todos),
		updateMain(main, todos),
		updateFooter(footer, todos)
	]}`;
});

controller.update();


