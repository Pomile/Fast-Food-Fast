export const showModal = (id, modalBlock) => {
  switch (modalBlock) {
    case 'deleteFoodItemContent':
      document.querySelector('#updateFoodItemContent').style.display = 'none';
      const deleteFoodItemContent = document.querySelector('#deleteFoodItemContent');
      if (deleteFoodItemContent.style.display === 'none') {
        deleteFoodItemContent.style.display = 'block';
      }
      document.getElementById(id).style.display = 'block';
      break;
    case 'locationForm':
      document.querySelector('#cart').style.display = 'none';
      document.querySelector('#foodVariants').style.display = 'none';
      const locationForm = document.querySelector('#locationForm');
      if (locationForm.style.display === 'none') {
        document.querySelector('#locationForm').style.display = 'block';
      }
      document.getElementById(id).style.display = 'block';
      break;
    case 'foodVariants':
      document.querySelector('#cart').style.display = 'none';
      document.querySelector('#locationForm ').style.display = 'none';
      const foodVariants = document.querySelector('#foodVariants');
      if (foodVariants.style.display === 'none') {
        document.querySelector('#foodVariants').style.display = 'block';
      }
      document.getElementById(id).style.display = 'block';
      break;
    case 'cart':
      document.querySelector('#locationForm').style.display = 'none';
      document.querySelector('#foodVariants').style.display = 'none';
      const cart = document.querySelector('#cart');
      if (cart.style.display === 'none') {
        document.querySelector('#cart').style.display = 'block';
      }
      document.getElementById(id).style.display = 'block';
      break;
    case 'orderDetail':

      const orderDetail = document.querySelector('#orderDetail');
      if (orderDetail.style.display === 'none') {
        document.querySelector('#orderDetail').style.display = 'block';
      }
      document.getElementById(id).style.display = 'block';
      break;
    default:
      document.querySelector('#updateFoodItemContent').style.display = 'block';
      document.querySelector('#deleteFoodItemContent').style.display = 'none';
      document.getElementById(id).style.display = 'block';
  }
};

export const closeModal = id => document.getElementById(id).style.display = '';
