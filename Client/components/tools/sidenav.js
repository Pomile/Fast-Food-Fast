const opennav = () => {
  // console.log('sidedrawer is clicked');
  const backdrop = document.getElementById('backdrop');
  const sidenavWrapper = document.getElementById('sidenavWrapper');
  backdrop.style.display = 'block';
  sidenavWrapper.style.transform = 'translateX(0%)';
};

/*export const closenav = () => {
  const backdrop = document.getElementById('backdrop');
  const sidenavWrapper = document.getElementById('sidenavWrapper');
  backdrop.style.display = 'none';
  sidenavWrapper.style.transform = 'translateX(-100%)';
}; */

export default opennav;
