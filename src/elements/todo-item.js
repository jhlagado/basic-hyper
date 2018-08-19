import { ENTER_KEY, ESC_KEY } from '../controllers/todo';

export class TodoItem extends HyperHTMLElement {

	static get observedAttributes() { return ['title','index','completed']; }
	
	created() {
		this.render();
	}
	
	attributeChangedCallback(name, oldValue, newValue) { 
		this.render(); 
	}	
	
	dblclick2Edit(event, input) {
		const li = input.closest('li');
		li.classList.add('editing');
		li.querySelector('.edit').focus();
	}
	
	blur2Save(index, event, input) {
		input.closest('li').classList.remove('editing');
		this.data.controller.edit(index, event);
	}

	edit(index, event, input) {
		if (event.keyCode === ENTER_KEY) {			
			input.closest('li').classList.remove('editing');
		}
		this.data.controller.edit(index, event);
	}

	escape2Reset(event, input) {
		if (event.keyCode === ESC_KEY) {
			input.value = this.data.todo.title;
			input.blur();
		}
	}

	complete(index) {
		this.data.controller.complete(index);
	}

	destroy(index) {
		this.data.controller.destroy(index);
	}

	render(){
		const element = this;
		const title = this.getAttribute('title');
		const completed = this.getAttribute('completed');
		const index = this.getAttribute('index');

		return this.html`
		<li
			data-index="${index}"
			class="${completed ? 'completed' : ''}"
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					checked="${completed}"
					onclick="${() => element.complete(index)}">
				<label ondblclick="${function(event){
					element.dblclick2Edit(event, this);
				}}">${title}</label>
				<button class="destroy" onclick="${() => element.destroy(index)}"></button>
			</div>
			<input
				class="edit"
				value="${title}"
				onblur="${function(event){ 
					element.blur2Save(index, event, this);
				}}"
				onkeypress="${function(event){
					element.edit(index, event, this);
				}}"
				onkeydown="${function (event) {
					element.escape2Reset(event, this);
				}}">
		</li>`;
	}
}

try { 
	TodoItem.define('todo-item') 
} catch (e) {}
