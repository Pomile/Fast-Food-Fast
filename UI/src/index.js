import './index.css';
import {
    sidedrawer,
    backdrop,
    sidenavWrapper,
    createAccountBtn,
    loginBtn,
    food,
    foodCart,
    imageFile,
    imageOutput,
    edit1,
    edit2,
    rm1,
    rm2,
    closeUpdateFoodItem,
    closeDeleteFoodItem,
    orderBtn,
    orderBtn2,
    closeLocationForm,
    closeLocationForm2,
    cartClip,
    category,
    categoryList,
    closeOrderDetails
  } from './assets/js/globals';
  import { opennav, closenav } from './assets/js/sidenav';
  import {
    showModal,
    closeModal,
  } from './assets/js/modal';
  import './assets/js/table';
  
  if (sidedrawer) {
    sidedrawer.onclick = () => opennav();
  }
  
  if (backdrop) {
    backdrop.onclick = () => {
      closenav();
      if(categoryList){
        categoryList.classList.add("-sidenav-food-navigation--isHidden");
      }
      
    }
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

      if ( window.scrollY >= 375){
        cartClip.classList.add('cartClip-onWindowScroll');
      }else{
      
        cartClip.classList.remove('cartClip-onWindowScroll');
      }
      
    })  
  }

  if(imageFile){
    imageFile.onchange = (event) =>{

      imageOutput.src = URL.createObjectURL(event.target.files[0]);
    }
  }

if(edit1){
  edit1.onclick = () => showModal('modal', 'updateFoodItemContent')
}

if(edit2){
  edit2.onclick = () => showModal('modal', 'updateFoodItemContent')
}

if(closeUpdateFoodItem){
  closeUpdateFoodItem.onclick = () => closeModal('modal');
}

if(rm1){
  rm1.onclick = () =>  showModal('modal', 'deleteFoodItemContent')
}

if(rm2){
  rm2.onclick = () =>  showModal('modal', 'deleteFoodItemContent')
}


if(closeDeleteFoodItem){
  closeDeleteFoodItem.onclick = () => closeModal('modal');
}

if(orderBtn){
  
  orderBtn.onclick = () => showModal('modal', 'locationForm');
}

if(orderBtn2){
  orderBtn2.onclick = () => showModal('modal', 'locationForm');
}

if (closeLocationForm) {

  closeLocationForm.onclick = function () {
    closeModal('modal');
  };
}

if (closeLocationForm2) {

  closeLocationForm2.onclick = function () {
    closeModal('modal');
  };
}

if(cartClip){
  cartClip.onclick = function () {
    showModal('modal', 'cart');
  }
}

if(category){
  category.onclick= function () {
    categoryList.classList.remove("-sidenav-food-navigation--isHidden");
  }

  category.onmouseover = function () {
    categoryList.classList.add("-sidenav-food-navigation--isHidden");
  }

  categoryList.onclick = function () {
    categoryList.classList.add("-sidenav-food-navigation--isHidden");
  }
}

if(closeOrderDetails){
  closeOrderDetails.onclick = function () {
    closeModal('modal')
  }
}