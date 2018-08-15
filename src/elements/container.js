export class MyContainer extends HyperHTMLElement {
	created() {
		this.render();
	}
	render() {
		return this.html`
			<my-header data=${this.data}></my-header>
			<my-main data=${this.data}></my-main>
			<my-footer data=${this.data}></my-footer>`
	}
}
try { 
	MyContainer.define('my-container') 
} catch (e) {}
