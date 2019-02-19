import createElement from '../tools/createElement';

const sideDrawerToggler = {

  render: () => {
    const sideDrawerTogglerDiv = createElement('div');
    sideDrawerTogglerDiv.onclick = sideDrawerToggler.opennav;
    sideDrawerTogglerDiv.className = 'sidedrawer hide-on-large-only';
    sideDrawerTogglerDiv.id = 'sidedrawer';

    for (let counter = 0; counter < 3; counter++) {
      const stroke = createElement('div');
      stroke.className = 'sidedrawer__stroke';
      sideDrawerTogglerDiv.appendChild(stroke);
    }
    return sideDrawerTogglerDiv;
  },
  opennav: () => {
    // console.log('sidedrawer is clicked');
    const backdrop = document.querySelector('#backdrop');
    const sidenavWrapper = document.querySelector('#sidenavWrapper');
    backdrop.style = 'display: block';
    sidenavWrapper.style = 'transform: translateX(0%)';
  },
};

export default sideDrawerToggler;
