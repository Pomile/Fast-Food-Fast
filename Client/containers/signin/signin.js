import '@babel/polyfill';
import header from '../../components/header/header';
import sidenav from '../../components/navigation/sidenav';
import signinSection from '../../components/signin/signin';
import footer from '../../components/footer/footer';
import backdrop from '../../components/UI/backdrop';


const signin = {
  render: async () => {
    const root = document.getElementById('root');
    const backDropComponent = await backdrop.render();
    const sidenavComponent = await sidenav.render([{ name: 'Home', path: '' }, { name: 'Create account', path: '/signup' }]);
    const headerComponent = await header.render([{ name: 'Home', path: '' }, { name: 'Create account', path: '/signup' }], ['navigation__link', 'navigation__link-full-height'], '-orangeredBgColor');
    const signupComponent = await signinSection.render('main-2');
    const footerComponent = await footer.render();
    root.appendChild(backDropComponent);
    root.appendChild(sidenavComponent);
    root.appendChild(headerComponent);
    root.appendChild(signupComponent);
    root.appendChild(footerComponent);
  },
};

export default signin;
