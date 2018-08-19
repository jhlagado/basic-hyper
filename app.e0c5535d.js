parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"n+DF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});let e=0;const t=exports.updateId=((e,t)=>e?0:t++),o=exports.Todo=((o,d)=>({title:o,id:t(d,e),completed:!1}));
},{}],"zGZQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initController=exports.ESC_KEY=exports.ENTER_KEY=void 0;var e=require("../models/todo");const t=exports.ENTER_KEY=13,o=exports.ESC_KEY=27,l=exports.initController=((o,l)=>{let r=[],s=l.get();const c=()=>{for(let e of r)e();l.set(s)};o.onhashchange=c;const i=()=>{const e=o.location.hash.slice(2);return"completed"!==e&&"active"!==e?"all":e};return{subscribe:e=>(r.push(e),()=>{r=r.filter(t=>t!=e)}),getItems:()=>s,getFilteredItems:()=>{const e=i();return"all"!==e?s.filter("active"===e?e=>!e.completed:e=>e.completed):s},clear:()=>{s=s.filter(e=>!e.completed),c()},complete:e=>{const t=s[e];t.completed=!t.completed,c()},create:o=>{const{keyCode:l,target:r}=o,i=r.value.trim();l===t&&i.length&&(s.push((0,e.Todo)(i)),r.value="",c())},destroy:e=>{s.splice(e,1),c()},edit:(e,o)=>{const{type:l,keyCode:r,target:i}=o;if("blur"===l||r===t){const t=i.value.trim();if(t.length){const e=i.closest("li").dataset.index;s[e].title=t,c()}else"blur"===l?controller.destroy(e):i.blur()}},hash:i,todosLeft:()=>s.filter(e=>!e.completed).length,todosSize:()=>s.length,toggleAll:e=>{s.forEach(t=>{t.completed=e.target.checked}),c()},update:c}});
},{"../models/todo":"n+DF"}],"j2cy":[function(require,module,exports) {
"use strict";function e(e){const t="todos-hyperHTML";return{get:()=>JSON.parse(e.getItem(t)||"[]"),set:r=>e.setItem(t,JSON.stringify(r))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.initStorage=e;
},{}],"g+ob":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e extends HyperHTMLElement{created(){this.render()}render(){return this.html`
			<my-header data=${this.data}></my-header>
			<todo-list data=${this.data}></todo-list>
			<my-footer data=${this.data}></my-footer>`}}exports.MyContainer=e;try{e.define("my-container")}catch(e){}
},{}],"RPVM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e extends HyperHTMLElement{created(){this.render()}render(){return this.html`
			<header class="header">
				<h1>todos</h1>
				<input 
					onkeypress="${this.data.controller.create}" 
					class="new-todo" 
					placeholder="What needs to be done?" 
					autofocus>
			</header>`}}exports.MyHeader=e;try{e.define("my-header")}catch(e){}
},{}],"r4zs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e extends HyperHTMLElement{created(){this.render(),this.data.controller.subscribe(()=>this.render())}render(){const e=this.data.controller,t=e.getFilteredItems();return this.html`
			<section class="main" style="${t.length?"":"display:none"}">
				<input
					class="toggle-all"
					id="toggle-all"
					type="checkbox"
					onclick="${e.toggleAll}"
					checked="${t.every(e=>e.completed)}">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">${t.map((t,l)=>this.data.hyper(t)`
						<todo-item 
							title=${t.title}
							completed=${t.completed}
							index=${l}
							data=${{controller:e}} />`)}</ul>
			</section>`}}exports.TodoList=e;try{e.define("todo-list")}catch(e){}
},{}],"m3Ro":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TodoItem=void 0;var t=require("../controllers/todo");class e extends HyperHTMLElement{static get observedAttributes(){return["title","index","completed"]}created(){this.render()}attributeChangedCallback(t,e,i){this.render()}dblclick2Edit(t,e){const i=e.closest("li");i.classList.add("editing"),i.querySelector(".edit").focus()}blur2Save(t,e,i){i.closest("li").classList.remove("editing"),this.data.controller.edit(t,e)}edit(e,i,s){i.keyCode===t.ENTER_KEY&&s.closest("li").classList.remove("editing"),this.data.controller.edit(e,i)}escape2Reset(e,i){e.keyCode===t.ESC_KEY&&(i.value=this.data.todo.title,i.blur())}complete(t){this.data.controller.complete(t)}destroy(t){this.data.controller.destroy(t)}render(){const t=this,e=this.getAttribute("title"),i=this.getAttribute("completed"),s=this.getAttribute("index");return this.html`
		<li
			data-index="${s}"
			class="${i?"completed":""}"
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					checked="${i}"
					onclick="${()=>t.complete(s)}">
				<label ondblclick="${function(e){t.dblclick2Edit(e,this)}}">${e}</label>
				<button class="destroy" onclick="${()=>t.destroy(s)}"></button>
			</div>
			<input
				class="edit"
				value="${e}"
				onblur="${function(e){t.blur2Save(s,e,this)}}"
				onkeypress="${function(e){t.edit(s,e,this)}}"
				onkeydown="${function(e){t.escape2Reset(e,this)}}">
		</li>`}}exports.TodoItem=e;try{e.define("todo-item")}catch(t){}
},{"../controllers/todo":"zGZQ"}],"qzUU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=exports.selectIfMatch=((e,t)=>e===t?"selected":""),t=exports.showIfSomeTodos=(e=>e>0?"":"display: none"),s=exports.pluralize=(e=>e>=2?"s":""),o=exports.showIfSomeComplete=((e,t)=>e<t?"":"display: none");class l extends HyperHTMLElement{created(){this.render(),this.data.controller.subscribe(()=>this.render())}render(){const l=this.data.controller,r=l.todosSize(),a=l.todosLeft(),c=l.hash();return this.html`
			<footer class="footer" style="${t(r)}">
				<span class="todo-count">
					<strong> ${a} </strong> item${s(a)} left
				</span>
				<ul class="filters">
					<li>
						<a class="${e(c,"all")}" href="#/">All</a>
					</li>
					<li>
						<a class="${e(c,"active")}" href="#/active">Active</a>
					</li>
					<li>
						<a class="${e(c,"completed")}" href="#/completed">Completed</a>
					</li>
				</ul>
				<button class="clear-completed" onclick="${l.clear}" style="${o(a,r)}">Clear completed</button>
			</footer>`}}exports.MyFooter=l;try{l.define("my-footer")}catch(e){}
},{}],"sbaJ":[function(require,module,exports) {
"use strict";require("./container"),require("./header"),require("./todo-list"),require("./todo-item"),require("./footer");
},{"./container":"g+ob","./header":"RPVM","./todo-list":"r4zs","./todo-item":"m3Ro","./footer":"qzUU"}],"vZyd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initApp=r;var e=require("./controllers/todo"),o=require("./models/storage");function r(){const r=HyperHTMLElement.hyper,t=(0,o.initStorage)(window.localStorage),n=(0,e.initController)(window,t),i={controller:n,hyper:r},l=r(window.document.querySelector("#todoapp"));l`<my-container data=${i}></my-container>`,n.update()}require("./elements");
},{"./controllers/todo":"zGZQ","./models/storage":"j2cy","./elements":"sbaJ"}]},{},["vZyd"], null)
//# sourceMappingURL=app.e0c5535d.map