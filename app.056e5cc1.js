parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"n+DF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});let e=0;const t=exports.updateId=((e,t)=>e?0:t++),o=exports.Todo=((o,d)=>({title:o,id:t(d,e),completed:!1}));
},{}],"zGZQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initController=exports.ESC_KEY=exports.ENTER_KEY=void 0;var e=require("../models/todo");const t=exports.ENTER_KEY=13,o=exports.ESC_KEY=27,l=exports.initController=((o,l)=>{let s=[],r=l.get();const c=()=>{for(let e of s)e();l.set(r)};o.onhashchange=c;const i=()=>{const e=o.location.hash.slice(2);return"completed"!==e&&"active"!==e?"all":e};return{subscribe:e=>(s.push(e),()=>{s=s.filter(t=>t!=e)}),getItems:()=>r,getFilteredItems:()=>{const e=i();return"all"!==e?r.filter("active"===e?e=>!e.completed:e=>e.completed):r},clear:()=>{r=r.filter(e=>!e.completed),c()},complete:e=>{const t=e.target.closest("li").dataset.index,o=r[t];o.completed=!o.completed,c()},create:o=>{const l=o.target,s=l.value.trim();o.keyCode===t&&s.length&&(r.push((0,e.Todo)(s)),l.value="",c())},destroy:e=>{const t=e.target.closest("li").dataset.index;r.splice(t,1),c()},edit:e=>{const{type:o,keyCode:l,target:s}=e;if("blur"===o||l===t){const t=s.value.trim();if(t.length){const e=s.closest("li").dataset.index;r[e].title=t,c()}else"blur"===o?controller.destroy(e):s.blur()}},hash:i,todosLeft:()=>r.filter(e=>!e.completed).length,todosSize:()=>r.length,toggleAll:e=>{r.forEach(t=>{t.completed=e.target.checked}),c()},update:c}});
},{"../models/todo":"n+DF"}],"j2cy":[function(require,module,exports) {
"use strict";function e(e){const t="todos-hyperHTML";return{get:()=>JSON.parse(e.getItem(t)||"[]"),set:r=>e.setItem(t,JSON.stringify(r))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.initStorage=e;
},{}],"g+ob":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e extends HyperHTMLElement{created(){this.render()}render(){return this.html`
			<my-header data=${this.data}></my-header>
			<my-main data=${this.data}></my-main>
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
},{}],"l6bL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MyMain=void 0;var e=require("../controllers/todo");class t extends HyperHTMLElement{created(){this.render(),this.data.controller.subscribe(()=>this.render())}renderTodo(){const t=this.data.controller;return l=>this.data.hyper(l)`
			<li
				data-index="${t.getItems().indexOf(l)}"
				class="${l.completed?"completed":""}"
			>
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
						checked="${l.completed}"
						onclick="${t.complete}">
					<label ondblclick="${function(){const e=this.closest("li");e.classList.add("editing"),e.querySelector(".edit").focus()}}">
						${l.title}
					</label>
					<button class="destroy" onclick="${t.destroy}"></button>
				</div>
				<input
					class="edit"
					value="${l.title}"
					onblur="${function(e){this.closest("li").classList.remove("editing"),t.edit(e)}}"
					onkeypress="${function(l){l.keyCode===e.ENTER_KEY&&this.closest("li").classList.remove("editing"),t.edit(l)}}"
					onkeydown="${function(t){t.keyCode===e.ESC_KEY&&(this.value=l.title,this.blur())}}">
			</li>`}render(){const e=this.data.controller,t=e.getFilteredItems();return this.html`
			<section class="main" style="${t.length?"":"display:none"}">
				<input
					class="toggle-all"
					id="toggle-all"
					type="checkbox"
					onclick="${e.toggleAll}"
					checked="${t.every(e=>e.completed)}">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">${t.map(this.renderTodo())}</ul>
			</section>`}}exports.MyMain=t;try{t.define("my-main")}catch(e){}
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
"use strict";require("./container"),require("./header"),require("./main"),require("./footer");
},{"./container":"g+ob","./header":"RPVM","./main":"l6bL","./footer":"qzUU"}],"vZyd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initApp=r;var e=require("./controllers/todo"),o=require("./models/storage");function r(){const r=HyperHTMLElement.hyper,t=(0,o.initStorage)(window.localStorage),n=(0,e.initController)(window,t),i={controller:n,hyper:r},l=r(window.document.querySelector("#todoapp"));l`<my-container data=${i}></my-container>`,n.update()}require("./elements");
},{"./controllers/todo":"zGZQ","./models/storage":"j2cy","./elements":"sbaJ"}]},{},["vZyd"], null)
//# sourceMappingURL=app.056e5cc1.map