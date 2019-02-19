import createElement from '../tools/createElement';

const backdrop = {

  render: () => {
    const backDropDiv = createElement('div');
    backDropDiv.className = 'backdrop';
    backDropDiv.id = 'backdrop';
    backDropDiv.onclick = backdrop.closenav;
    return backDropDiv;
  },
  closenav: () => {
    // console.log('sidedrawer is clicked');
    const backdropElem = document.querySelector('#backdrop');
    const sidenavWrapper = document.querySelector('#sidenavWrapper');
    backdropElem.style = 'display: none';
    sidenavWrapper.style = 'transform: translateX(-100%)';
  },
};

export default backdrop;
