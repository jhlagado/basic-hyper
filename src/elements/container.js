export class MyContainer extends HyperHTMLElement {
	created() {
		this.render();
	}
	render() {
		return this.html`
			<my-header data=${this.data}></my-header>
			<todo-list data=${this.data}></todo-list>
			<my-footer data=${this.data}></my-footer>`
	}
}
try { 
	MyContainer.define('my-container') 
} catch (e) {}
