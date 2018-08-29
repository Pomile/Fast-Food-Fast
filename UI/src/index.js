import './index.css';
import {
    sidedrawer,
    backdrop,
    sidenavWrapper,
    createAccountBtn,
    loginBtn
  } from './assets/js/globals';
  import { opennav, closenav } from './assets/js/sidenav';

/* ............sidenav............*/
  if (sidedrawer) {
    sidedrawer.onclick = () => opennav();
  }
  
  if (backdrop) {
    backdrop.onclick = () => closenav();
  }

  if (createAccountBtn) {
    createAccountBtn.onclick = () => window.location.href = "./user.html";
  }

  if (loginBtn) {
    loginBtn.onclick = () => window.location.href = "./user.html";
  }