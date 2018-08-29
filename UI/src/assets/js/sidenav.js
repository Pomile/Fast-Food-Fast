export const opennav = () => {
  // console.log('sidedrawer is clicked');
  backdrop.style.display = 'block';
  sidenavWrapper.style.transform = 'translateX(0%)';
};

export const closenav = () => {

  backdrop.style.display = 'none';
  sidenavWrapper.style.transform = 'translateX(-100%)';

};