import createElement from '../tools/createElement';

const headerSeparator = {
  render: () => {
    const headerSeparatorDiv = createElement('div');
    headerSeparatorDiv.className = 'headerSeperator';

    return headerSeparatorDiv;
  },


};

export default headerSeparator;
