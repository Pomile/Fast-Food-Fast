import createElement from '../tools/createElement';
import landingBlock from './landingBlock';

const mainHome = {

  render: () => {
    const mainHomeDiv = createElement('div');
    mainHomeDiv.id = 'main-home';
    const landingBlockComponent = landingBlock();
    mainHomeDiv.appendChild(landingBlockComponent);
    return mainHomeDiv;
  },
};

export default mainHome;
