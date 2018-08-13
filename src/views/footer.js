export const selectIfMatch = (hash, curr) => hash === curr ? 'selected' : '';
export const showIfSomeTodos = length => length > 0 ? '' : 'display: none';
export const pluralize = length => length >= 2 ? 's' : '';
export const showIfSomeComplete = (numTodosIncomplete, numTodos) => numTodosIncomplete < numTodos ? '' : 'display: none'

export default (controller, hyper) => {

	const numTodos = controller.todosSize();
	const numTodosIncomplete = controller.todosLeft();
	const hash = controller.hash();

	return hyper()`
	<footer class="footer" style="${showIfSomeTodos(numTodos)}">
		<span class="todo-count">
			<strong> ${numTodosIncomplete} </strong> item${pluralize(numTodosIncomplete)} left
		</span>
		<ul class="filters">
			<li><a class="${selectIfMatch(hash, 'all')}" href="#/">All</a></li>
			<li><a class="${selectIfMatch(hash, 'active')}" href="#/active">Active</a></li>
			<li><a class="${selectIfMatch(hash, 'completed')}" href="#/completed">Completed</a></li>
		</ul>
		<button
			class="clear-completed"
			onclick="${controller.clear}"
			style="${showIfSomeComplete(numTodosIncomplete, numTodos)}"
		>Clear completed</button>
	</footer>`;
};

export class MyFooter extends HyperHTMLElement {
	static get observedAttributes() {
		return ['numtodos', 'numincomplete', 'hash'];
	}
	attributeChangedCallback() {
		this.render();
	}
	render() {
		return this.html`
			<div>num todos ${this.numtodos}</div>
			<div>num incomplete ${this.numincomplete}</div>
			<div>hash ${this.hash}</div>
		`
	}
}
MyFooter.define('my-footer');
