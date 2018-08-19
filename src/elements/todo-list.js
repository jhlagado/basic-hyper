export class TodoList extends HyperHTMLElement {

	created() {
		this.render();
		this.data.controller.subscribe(() => this.render());
	}

	render() {

		const controller = this.data.controller;
		const todos = controller.getFilteredItems();
		return this.html`
			<section class="main" style="${todos.length ? '' : 'display:none'}">
				<input
					class="toggle-all"
					id="toggle-all"
					type="checkbox"
					onclick="${controller.toggleAll}"
					checked="${todos.every(todo => todo.completed)}">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">${todos.map(
					(todo, index) => this.data.hyper(todo)`
						<todo-item 
							title=${todo.title}
							completed=${todo.completed}
							index=${index}
							data=${{controller}} />`
				)}</ul>
			</section>`
	}
}
try { 
	TodoList.define('todo-list') 
} catch (e) {}
