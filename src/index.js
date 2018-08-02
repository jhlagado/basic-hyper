import hyper from 'hyperhtml';
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

import controller from './controllers/todo';
import storage from './models/storage';
import updateHeader from './views/header';
import updateMain from './views/main';
import updateFooter from './views/footer';

const appRender = hyper(document.querySelector('.todoapp'));

controller.init(storage, todos => {
	const render = hyper();
	appRender`${[
		updateHeader(render, todos),
		updateMain(render, todos),
		updateFooter(render, todos)
	]}`;
});

controller.update();


