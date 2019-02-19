import createElement from '../tools/createElement';

import logoImg from '../../assets/images/food_delivery_logo.png';

const logo = () => {
  const logoDiv = createElement('div');
  logoDiv.className = 'logo';
  const logoImage = createElement('img');
  logoImage.src = logoImg;
  logoDiv.appendChild(logoImage);
  return logoDiv;
};

export default logo;
