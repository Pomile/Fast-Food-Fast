import '@babel/polyfill';
import header from '../../components/header/header';
import sidenav from '../../components/navigation/sidenav';
import signupSection from '../../components/signup/signup';
import footer from '../../components/footer/footer';
import signupAction from '../../actions/signup/signup';
import backdrop from '../../components/UI/backdrop';


const signup = {
  render: async () => {
    const root = document.getElementById('root');
    const backDropComponent = await backdrop.render();
    const sidenavComponent = await sidenav.render([{ name: 'Create account', path: '/signup' }, { name: 'Sign in', path: '/signin' }]);
    const headerComponent = await header.render([{ name: 'Home', path: '' }, { name: 'Sign in', path: '/signin' }], ['navigation__link', 'navigation__link-full-height'], '-orangeredBgColor');
    const signupComponent = await signupSection.render('main-2');
    const footerComponent = await footer.render();
    root.appendChild(backDropComponent);
    root.appendChild(sidenavComponent);
    root.appendChild(headerComponent);
    root.appendChild(signupComponent);
    root.appendChild(footerComponent);
  },
};

export default signup;
