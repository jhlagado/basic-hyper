import { Document } from 'basichtml';
// Array.prototype.contains = Array.prototype.includes; //polyfill node

global.document = new Document();
const hyper = require('hyperhtml').hyper;

// attributes
document.documentElement.setAttribute('lang', 'en');

// common accessors
document.documentElement.innerHTML = `
  <head></head>
  <body>
    <div id="todoapp"></div>
  </body> 
`;

const initLocalStorage = (() => {
  let items = [];
  return {
    setItem(name, item) {
      items[name] = item;
    },
    getItem(name) {
      return items[name];
    }
  }
});

const window = {
  location: {
    hash: ''
  },
  localStorage: initLocalStorage(),
  document
};

import { initApp } from './app.js';

initApp(hyper, window)

it('first test', () => {
  expect(true).toBe(true);
});
