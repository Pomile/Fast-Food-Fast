import '@babel/polyfill';
import './index.css';
import router from './routes/router';
import signup from './actions/signup/signup';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
window.signup = signup;
