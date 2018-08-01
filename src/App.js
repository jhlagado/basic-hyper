import logo from './logo.svg';
import './App.css';

export const App = (render) => render`
<div class="App">
    <header class="App-header">
    <img src=${logo} class="App-logo" alt="logo" />
    <h1 class="App-title">Welcome to HyperHtml</h1>
    </header>
    <p class="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
    </p>
</div>`;
