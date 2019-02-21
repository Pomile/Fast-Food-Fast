import createElement from '../tools/createElement';

const footer = {
  render: () => {
    const footerDiv = createElement('div');
    footerDiv.className = '-orangeredBgColor';
    footerDiv.id = 'footer';
    footerDiv.innerHTML = 'soft-sky@live.co.uk';

    return footerDiv;
  },
};

export default footer;
