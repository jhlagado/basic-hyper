import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import hyper from 'hyperhtml';
import { App } from './App'

// registerServiceWorker();
// render`xxxxx`;


const render = hyper(document.getElementById('root'));
App(render);

