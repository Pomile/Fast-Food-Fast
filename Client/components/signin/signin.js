import createElement from '../tools/createElement';
import headerSeparator from '../UI/headerSeparator';
import img from '../../assets/images/fasta-fosto.png';
import form from './form';


const signinSection = {
  render: async (parentId) => {
    const main = createElement('div');
    main.id = parentId;
    main.className = '-whiteBgColor';
    const headerSeparatorComponent = await headerSeparator.render();

    const signinBox = createElement('div');
    signinBox.className = 'signinBox';


    const signinBoxSection = createElement('div');
    signinBoxSection.className = 'signinBox__section -col-sm-12 -col-m-4 -col-l-3 -offset-m-4 -offset-l-3x';

    const signinBoxSectionForm = createElement('form');
    signinBoxSectionForm.className = 'signinBox__form';

    const signinBoxImgDiv = createElement('div');
    signinBoxImgDiv.className = 'signinBox__img';
    const signinBoxImg = createElement('img');
    signinBoxImg.src = img;


    const signinBoxHeader = createElement('h2');
    signinBoxHeader.className = 'signinBox__header -fs-cs-medium -orangeredTxtColor';
    signinBoxHeader.innerHTML = 'Sign in';


    signinBoxImgDiv.appendChild(signinBoxImg);
    signinBoxSectionForm.appendChild(signinBoxImgDiv);
    signinBoxSectionForm.appendChild(signinBoxHeader);
    signinBoxSectionForm.insertAdjacentHTML('beforeend', form);
    signinBoxSection.appendChild(signinBoxSectionForm);
    signinBox.appendChild(signinBoxSection);
    main.appendChild(headerSeparatorComponent);
    main.appendChild(signinBox);

    return main;
  },
};

export default signinSection;
