import HyperHTMLElement from './common/hyperhtml-element1';
const hyper = HyperHTMLElement.hyper;

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

import { initApp } from './app.js';
import { MyElement2 } from './element';

// initApp(hyper, window); 
 
class MyElement extends HTMLElement {
    connectedCallback() {
      this.textContent = 'hello';
    }
}
   
customElements.define('my-element', MyElement);

class MyElement1 extends HTMLElement {
    connectedCallback() {
      this.textContent = 'hello1';
    }
}
customElements.define('my-element1', MyElement1);
   
customElements.define('my-element2', MyElement2);

console.log(HyperHTMLElement);

class CustomElement extends HyperHTMLElement {
    static get observedAttributes() { return ['owner']; }
    created() { this.render(); }
    render() {
      this.html`
      This is <b>${this.owner}</b>'s name-tag element.`;
    }
  }

CustomElement.define('custom-element');
