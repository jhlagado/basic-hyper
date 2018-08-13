export class MyHeader extends HyperHTMLElement {
	static get observedAttributes() {
		return ['value'];
	}
	attributeChangedCallback() {
		this.render();
	}
	render() {
		return this.html`
		<header class="header">
			<h1>todos</h1>
			<input id="new-todo" class="new-todo" placeholder="What needs to be done?" autofocus>
		</header>`
	}
}
MyHeader.define('my-header');
