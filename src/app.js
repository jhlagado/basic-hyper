import { initController } from './controllers/todo';
import { initStorage } from './models/storage';
import updateHeader from './views/header';
import updateMain from './views/main';
import updateFooter from './views/footer';

export function initApp(hyper, window) {
	const storage = initStorage(window.localStorage);
	const controller = initController(window, storage, todos => {
		const appRender = hyper(window.document.querySelector('.todoapp'));
		appRender`${[
			updateHeader(controller, hyper),
			updateMain(controller, hyper, todos),
			updateFooter(controller, hyper)
		]}`;
	});
	controller.update();
}
