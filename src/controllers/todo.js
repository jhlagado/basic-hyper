import { Todo } from '../models/todo';

export const ENTER_KEY = 13;
export const ESC_KEY = 27;

export const initController = (window, storage, updateFunc) => {

	let items = storage.get();

	const update = () => {
		const h = hash();
		let todos = items;
		if (h !== 'all') {
			todos = todos.filter(
				h === 'active' ?
					todo => !todo.completed :
					todo => todo.completed
			);
		}
		updateFunc(todos);
		storage.set(items);
	};
	window.onhashchange = update;

	const getItems = () => items;

	// controller actions invoked through the DOM

	const clear = () => {
		items = items.filter(todo => !todo.completed);
		update();
	}

	const complete = event => {
		const index = event.target.closest('li').dataset.index;
		const todo = items[index];
		todo.completed = !todo.completed;
		update();
	}

	const create = event => {
		const target = event.target;
		const value = target.value.trim();
		if (event.keyCode === ENTER_KEY && value.length) {
			items.push(Todo(value));
			target.value = '';
			update();
		}
	}

	const destroy = event => {
		const index = event.target.closest('li').dataset.index;
		items.splice(index, 1);
		update();
	}

	const edit = event => {
		if (event.type === 'blur' || event.keyCode === ENTER_KEY) {
			const value = event.target.value.trim();
			if (value.length) {
				const index = event.target.closest('li').dataset.index;
				items[index].title = value;
				update();
			} else {
				if (event.type === 'blur') {
					controller.destroy(event);
				} else {
					event.target.blur();
				}
			}
		}
	}

	const hash = () => {
		const str = window.location.hash.slice(2);
		return str !== 'completed' && str !== 'active' ? 'all' : str;
	}

	const todosLeft = () => items.filter(todo => !todo.completed).length;

	const todosSize = () => items.length;

	const toggleAll = (event) => {
		items.forEach(todo => {
			todo.completed = event.target.checked;
		});
		update();
	}

	return {
		getItems,
		clear,
		complete,
		create,
		destroy,
		edit,
		hash,
		todosLeft,
		todosSize,
		toggleAll,
		update
	}

}
