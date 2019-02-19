import '@babel/polyfill';
import './index.css';
import router from './routes/router';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
