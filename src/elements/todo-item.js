import { ENTER_KEY, ESC_KEY } from '../controllers/todo';

export class TodoItem extends HyperHTMLElement {

	static get observedAttributes() { return ['title','index','completed']; }
	
	constructor() {
		super();
	}

	created() {
		this.render();
	}
	
	attributeChangedCallback(name, oldValue, newValue) { 
		this.render(); 
	}	
	
	dblclick2Edit(event) {
		const input = event.target;
		const li = input.closest('li');
		li.classList.add('editing');
		li.querySelector('.edit').focus();
	}
	
	blur2Save(event) {
		const index = this.getAttribute('index');
		const input = event.target;
		input.closest('li').classList.remove('editing');
		this.data.controller.edit(index, event);
	}

	edit(event) {
		const index = this.getAttribute('index');
		const input = event.target;
		if (event.keyCode === ENTER_KEY) {			
			input.closest('li').classList.remove('editing');
		}
		this.data.controller.edit(index, event);
	}

	escape2Reset(event) {
		const input = event.target;
		if (event.keyCode === ESC_KEY) {
			input.value = this.data.todo.title;
			input.blur();
		}
	}

	complete(event) {
		const index = this.getAttribute('index');
		this.data.controller.complete(index);
	}

	destroy(event) {
		const index = this.getAttribute('index');
		this.data.controller.destroy(index);
	}

	render(){
		const title = this.getAttribute('title');
		const completed = this.getAttribute('completed');

		return this.html`
		<li
			data-index="${this.getAttribute('index')}"
			class="${completed ? 'completed' : ''}"
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					checked="${completed}"
					onclick="${this.complete.bind(this)}">
				<label ondblclick="${this.dblclick2Edit.bind(this)}">${title}</label>
				<button class="destroy" onclick="${this.destroy.bind(this)}"></button>
			</div>
			<input
				class="edit"
				value="${title}"
				onblur="${this.blur2Save.bind(this)}"
				onkeypress="${this.edit.bind(this)}"
				onkeydown="${this.escape2Reset.bind(this)}">
		</li>`;
	}
}

try { 
	TodoItem.define('todo-item') 
} catch (e) {}
