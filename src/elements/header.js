export class MyHeader extends HyperHTMLElement {
	created() {
		this.render();
	}
	render() {
		return this.html`
			<header class="header">
				<h1>todos</h1>
				<input 
					onkeypress="${this.data.controller.create}" 
					class="new-todo" 
					placeholder="What needs to be done?" 
					autofocus>
			</header>`
	}
}
try { 
	MyHeader.define('my-header') 
} catch (e) {}
