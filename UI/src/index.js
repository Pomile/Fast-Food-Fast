import './index.css';
import {
    sidedrawer,
    backdrop,
    sidenavWrapper,
  } from './assets/js/globals';
  import { opennav, closenav } from './assets/js/sidenav';

/* ............sidenav............*/
  if (sidedrawer) {
    sidedrawer.onclick = () => opennav();
  }
  
  if (backdrop) {
    backdrop.onclick = () => closenav();
  }