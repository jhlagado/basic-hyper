import { initController } from './controllers/todo';
import { initStorage } from './models/storage';
import './views/header';
import updateMain from './views/main';
import updateFooter from './views/footer';

export function initApp(hyper, window) {
	const storage = initStorage(window.localStorage);
	const controller = initController(window, storage, todos => {
		const appRender = hyper(window.document.querySelector('#todoapp'));
		appRender`!HEADER!
		<my-container>
		</my-container>
		${[
			updateMain(controller, hyper, todos),
			updateFooter(controller, hyper)
		]}`;
	});
	controller.update();


	class MyContainer extends HyperHTMLElement {
		static get observedAttributes() {
			return ['owner'];
		}
		created() {
			this.x = 2222;
			this.render();
		}
		todoCreate(e) {
			console.log('create todo!!!!!!!: ', e.target.id, this.x);
		}
		render() {
			let todosSize = 23;

			this.html`${controller.todosSize()}
				<my-header value="23" oninput=${e => this.todoCreate(e)}></my-header>
				<my-footer numtodos=${controller.todosSize()} numincomplete=${controller.todosLeft()} hash=${controller.hash()}></my-footer>
				<my-footer id="x1" numtodos=${todosSize} numincomplete=${controller.todosLeft()} hash=${controller.hash()}></my-footer>
			`;
		}
	}
	MyContainer.define('my-container');

	setTimeout(()=>{
		const el = document.querySelector('#x1')
		el.setAttribute('numtodos', '33');
		console.log('!!!!!!: ', el);
	}, 5000);

}
