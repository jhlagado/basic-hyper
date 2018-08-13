import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import { initApp } from './app.js';

const hyper = HyperHTMLElement.hyper;

initApp(hyper, window);

console.log('============>', hyper);

class X {
  greet() {
    return 'Hi!!!';
  }
}

const x = new X();

console.log(x.greet());

class MySelf extends HyperHTMLElement {
  static get observedAttributes() { return ['name', 'age']; }
  created() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    return this.html`
       Hi, my name is ${this.name} and I am ${this.age}`;
  }
}
MySelf.define('my-self');

class MyInput extends HyperHTMLElement {
  static get observedAttributes() { return ['value', 'boolean']; }
  attributeChangedCallback() {
    this.render();
  }
  oninput(e) {
    this.value = e.target.value;
    this.render();
  }
  render() {
    return this.html`
      <input value="${this.value}" oninput="${this}">`;
  }
}
MyInput.define('my-input');

class MyLink extends HyperHTMLElement {
  created() {
    this.href = 'https://github.com/WebReflection/hyperHTML-Element/';
    this.render();
  }
  render() {
    return this.html`it worked`;
  }
}
MyLink.define('my-link', { extends: 'a' });
