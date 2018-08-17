import { ENTER_KEY, ESC_KEY } from '../controllers/todo';

export class MyMain extends HyperHTMLElement {

	created() {
		this.render();
		this.data.controller.subscribe(() => this.render());
	}

	renderTodo() {

		const controller = this.data.controller;

		function dblclick2Edit() {
			const li = this.closest('li');
			li.classList.add('editing');
			li.querySelector('.edit').focus();
		}
		
		function blur2Save(event) {
			this.closest('li').classList.remove('editing');
			controller.edit(event);
		}

		function edit(event) {
			if (event.keyCode === ENTER_KEY) {			
				this.closest('li').classList.remove('editing');
			}
			controller.edit(event);
		}

		return todo => this.data.hyper(todo)`
			<li
				data-index="${controller.getItems().indexOf(todo)}"
				class="${todo.completed ? 'completed' : ''}"
			>
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
						checked="${todo.completed}"
						onclick="${controller.complete}">
					<label ondblclick="${dblclick2Edit}">
						${todo.title}
					</label>
					<button class="destroy" onclick="${controller.destroy}"></button>
				</div>
				<input
					class="edit"
					value="${todo.title}"
					onblur="${blur2Save}"
					onkeypress="${edit}"
					onkeydown="${function escape2Reset(event) {
						if (event.keyCode === ESC_KEY) {
							this.value = todo.title;
							this.blur();
						}
					}}">
			</li>`;
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
				<ul class="todo-list">${todos.map(this.renderTodo())}</ul>
			</section>`
	}
}
try { 
	MyMain.define('my-main') 
} catch (e) {}
