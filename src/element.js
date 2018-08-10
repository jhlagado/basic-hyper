export class MyElement2 extends HTMLElement {
  connectedCallback() {
    this.textContent = 'hello2';
  }
}

