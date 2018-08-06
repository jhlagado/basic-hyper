import { Document } from 'basichtml';

global.document = new Document();
const hyper = require('hyperhtml').hyper;

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

document.documentElement.innerHTML = `
  <head></head>
  <body>
    <div id="test"></div>
  </body>
`;

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
