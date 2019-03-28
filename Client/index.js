import '@babel/polyfill';
import './index.css';
import router from './routes/router';
import signup from './actions/signup/signup';
import signin from './actions/signin/signin';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
window.signup = signup;
window.signin = signin;
