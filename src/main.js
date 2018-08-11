const loadComponent = function() {
    class Gah extends HTMLElement {

        constructor() {
            super();
            // get properties here
        }

        connectedCallback() {
            // do stuff here
        }

        attributeChangedCallback(attrName, oldVal, newVal) {}

    }
    customElements.define('gah', Gah);
};

// Conditional loading of polyfill
if (window.customElements) {
    loadComponent();
} else {
    document.addEventListener('WebComponentsReady', function() {
        loadComponent();
    });
}
