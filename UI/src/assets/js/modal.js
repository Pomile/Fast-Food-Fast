export const showModal = (id, modalBlock) => {
    switch (modalBlock) {
      
      case 'deleteFoodItemContent':
        console.log(modalBlock);
        document.querySelector('#updateFoodItemContent').style.display = 'none';
        const deleteFoodItemContent = document.querySelector('#deleteFoodItemContent');
        if (deleteFoodItemContent.style.display === 'none') {
            deleteFoodItemContent.style.display = 'block';
        }
        document.getElementById(id).style.display = 'block';
        break;
        case 'locationForm':
        console.log(modalBlock);
        // document.querySelector('#updateFoodItemContent').style.display = 'none';
        const locationForm = document.querySelector('#locationForm');
        if (locationForm.style.display === 'none') {
            locationForm.style.display = 'block';
        }
        document.getElementById(id).style.display = 'block';
        break;
      default:
        
        document.querySelector('#updateFoodItemContent').style.display = 'block';
        document.querySelector('#deleteFoodItemContent').style.display = 'none';
        document.getElementById(id).style.display = 'block';
    }
  
  };
  
  export const closeModal = (id) => {
    return document.getElementById(id).style.display = '';
  };
  