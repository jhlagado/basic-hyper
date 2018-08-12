import { hyper } from 'hyperhtml';

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

import { initApp } from './app.js';
// import { MyElement2 } from './element';

// initApp(hyper, window); 
 
class Clock extends hyper.Component {
  get defaultState() { return {date: new Date()}; }
  onconnected() {
    console.log('finally live');
  }
  render() {
    return this.html`
      <div onconnected=${this} >
        <h1>Hello, world!</h1>
        <h2>It is ${
          this.state.date.toLocaleTimeString()
        }.</h2>
      </div>`;
  }
}

const update = () => hyper(document.body.querySelector('clock'))`${new Clock}`;

update();

setInterval(update, 1000);

class Counter extends hyper.Component {
  get defaultState() {
    return {css: 'font-weight:bold;padding:10px;border:1px solid #888', count: 0};
  }
  constructor(count = 0) {
    super();
    this.setState({count});
  }
  onclick() {
    this.setState(prev => ({count: prev.count + 1}));
  }
  render() {
    return this.html`
      <button style=${this.state.css} onclick=${this}>
        ${this.state.count}
      </button>`;
  }
}

hyper(document.body.querySelector('counter'))`${new Counter(0)}`;

