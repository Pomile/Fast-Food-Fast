import './index.css';
import {
    sidedrawer,
    backdrop,
    sidenavWrapper,
    createAccountBtn,
    loginBtn,
    food,
    foodCart,
  } from './assets/js/globals';
  import { opennav, closenav } from './assets/js/sidenav';
  
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

  if(food || foodCart){
    
    window.addEventListener('scroll', () =>{
      let foodClientRectY = food.getClientRects()[0].y
      console.log('wins scroll', window.screenY >= 405 , window.scrollY);
      if ( window.scrollY >= 450){
        food.classList.add('food--onWindowScroll');
      
      
      }else{
        food.classList.remove('food--onWindowScroll');
      }

      if ( window.scrollY >= 240){
  
        foodCart.classList.add('foodCart-onWindowScroll');
      
      }else{
      
        foodCart.classList.remove('foodCart-onWindowScroll');
      }
      
    })
    
  }