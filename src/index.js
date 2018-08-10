// import { hyper } from "hyperhtml";
// import HyperHTMLElement from "hyperhtml-element";
// import { initApp } from './app.js';

// import "todomvc-common/base.css";
// import "todomvc-app-css/index.css";

// initApp(hyper, window); 

// import HyperHTMLElement from 'hyperhtml-element/esm';

// console.log(HyperHTMLElement)

// class CustomElement extends HyperHTMLElement {
//     created() {
//       this.textContent = "I'm a custom-element.";
//     }
// }

// console.log(CustomElement)


// CustomElement.define('custom-element');
// import HyperHTMLElement from "./hyperhtml-element"

// const _fixBabelExtend = (v) => v;
 
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
   
import { MyElement2 } from './element';
customElements.define('my-element2', MyElement2);

// console.log(MyElement, MyElement1, MyElement2)

import HyperHTMLElement from './hyperhtml-element';
// import HyperHTMLElement from 'hyperhtml-element/esm';

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
