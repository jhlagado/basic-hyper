import BasicHTML from 'basichtml';
// console.log(Objecat.keys(BasicHTML))

const { CustomElementRegistry, Document } = BasicHTML;
const window = global;
Object.assign(window, BasicHTML);
window.window = window;
window.customElements = new CustomElementRegistry();
window.document = new Document(window.customElements);

window.HyperHTMLElement = require('hyperhtml-element').default;

document.documentElement.setAttribute('lang', 'en');
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

window.localStorage = initLocalStorage();
window.location = {
  hash: ''
};
