import {isRegistered} from '../common/register';

export function initMyHeader(controller) {

	class MyHeader extends HyperHTMLElement {
		created() {
			this.render();
		}
		render() {
			return this.html`
				<header class="header">
					<h1>todos</h1>
					<input 
						onkeypress="${controller.create}" 
						class="new-todo" 
						placeholder="What needs to be done?" 
						autofocus>
				</header>`
		}
	}
	if (!isRegistered('my-header')) MyHeader.define('my-header');
	return MyHeader;
}