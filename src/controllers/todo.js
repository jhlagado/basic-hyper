import { Todo } from '../models/todo';

export const ENTER_KEY = 13;
export const ESC_KEY = 27;

export const initController = (window, storage) => {

	let updateFuncs = [];
	let items = storage.get();

	const update = () => {
		for (let func of updateFuncs) {
			func();
		};
		storage.set(items);
	};
	window.onhashchange = update;

	const subscribe = func => {
		updateFuncs.push(func);
		return () => {updateFuncs = updateFuncs.filter(f => f != func)}
	};	

	const getItems = () => items;
	const getFilteredItems = () => {
		const h = hash();
		return (h !== 'all') ?
			items.filter(
				h === 'active' ?
					todo => !todo.completed :
					todo => todo.completed
			) :
			items;
	};

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
		const {type, keyCode, target} = event;
		if (type === 'blur' || keyCode === ENTER_KEY) {
			const value = target.value.trim();
			if (value.length) {
				const index = target.closest('li').dataset.index;
				items[index].title = value;
				update();
			} else {
				if (type === 'blur') {
					controller.destroy(event);
				} else {
					target.blur();
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

	const toggleAll = event => {
		items.forEach(todo => {
			todo.completed = event.target.checked;
		});
		update();
	}

	return {
		subscribe,
		getItems,
		getFilteredItems,
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
