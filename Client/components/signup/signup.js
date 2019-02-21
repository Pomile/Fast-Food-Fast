import createElement from '../tools/createElement';
import headerSeparator from '../UI/headerSeparator';
import img from '../../assets/images/delivery-img.png';
import formContent from './formContent';


const signupBoxSection1 = () => {
  const signupBoxSection1Div = createElement('div');
  signupBoxSection1Div.className = 'signupBox__section-1 hide-on-medium-and-down -col-l-5';

  const signupBoxSection1Image = createElement('img');
  signupBoxSection1Image.src = img;

  const signupBoxSection1header = createElement('h1');
  signupBoxSection1header.className = '-orangeredTxtColor';
  signupBoxSection1header.innerHTML = 'Sign up for free account';

  const signupBoxSection1List = createElement('ul');

  const whyOrder = ['Feel free to order for any food of your choice', 'Make payment with ease',
    'get your Orders faster'];
  whyOrder.map((value) => {
    const list = createElement('li');
    list.innerHTML = value;
    signupBoxSection1List.appendChild(list);
  });

  signupBoxSection1Div.appendChild(signupBoxSection1Image);
  signupBoxSection1Div.appendChild(signupBoxSection1header);
  signupBoxSection1Div.appendChild(signupBoxSection1List);

  return signupBoxSection1Div;
};
const signupSection = {
  render: async (parentId) => {
    const main = createElement('div');
    main.id = parentId;
    main.className = '-whiteBgColor';
    const headerSeparatorComponent = await headerSeparator.render();

    const signupBox = createElement('div');
    signupBox.className = 'signupBox';

    const signupBoxSection1Div = await signupBoxSection1();

    const signupBoxSection2 = createElement('div');
    signupBoxSection2.className = 'signupBox__section-2 -offset-m-1 -col-sm-12 -col-m-10 -col-l-6';

    const signupBoxSection2Form = createElement('form');
    signupBoxSection2Form.className = 'signupBox__form';
    signupBoxSection2Form.insertAdjacentHTML('afterbegin', formContent);
    signupBoxSection2.appendChild(signupBoxSection2Form);
    signupBox.appendChild(signupBoxSection1Div);
    signupBox.appendChild(signupBoxSection2);

    main.appendChild(headerSeparatorComponent);
    main.appendChild(signupBox);

    return main;
  },


};


export default signupSection;
