import { initController } from './controllers/todo';
import { initStorage } from './models/storage';
import { initMyHeader } from './views/header';
import { initMyMain } from './views/main';
import { initMyFooter } from './views/footer';

export function initApp(hyper, window) {

	const storage = initStorage(window.localStorage);
	const controller = initController(window, storage);

	initMyHeader(controller);
	initMyMain(controller, hyper);
	initMyFooter(controller);

	controller.update();
}
