import {isRegistered} from '../common/register';

export const selectIfMatch = (hash, curr) => hash === curr ? 'selected' : '';
export const showIfSomeTodos = length => length > 0 ? '' : 'display: none';
export const pluralize = length => length >= 2 ? 's' : '';
export const showIfSomeComplete = (numTodosIncomplete, numTodos) => numTodosIncomplete < numTodos ? '' : 'display: none'

export function initMyFooter(controller) {

	class MyFooter extends HyperHTMLElement {
		created(){
			this.render();
            controller.subscribe(() => this.render());
		}
		render() {
			const numTodos = controller.todosSize();
			const numTodosIncomplete = controller.todosLeft();
			const hash = controller.hash();
			
			return this.html`
				<footer class="footer" style="${showIfSomeTodos(numTodos)}">
					<span class="todo-count">
						<strong> ${numTodosIncomplete} </strong> item${pluralize(numTodosIncomplete)} left
					</span>
					<ul class="filters">
						<li>
							<a class="${selectIfMatch(hash, 'all')}" href="#/">All</a>
						</li>
						<li>
							<a class="${selectIfMatch(hash, 'active')}" href="#/active">Active</a>
						</li>
						<li>
							<a class="${selectIfMatch(hash, 'completed')}" href="#/completed">Completed</a>
						</li>
					</ul>
					<button class="clear-completed" onclick="${controller.clear}" style="${showIfSomeComplete(numTodosIncomplete, numTodos)}">Clear completed</button>
				</footer>`
		}
	}
	if (!isRegistered('my-footer')) MyFooter.define('my-footer');
	return MyFooter;
}