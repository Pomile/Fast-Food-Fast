import createElement from '../tools/createElement';
import logo from '../UI/logo';
import navigation from '../navigation/navigation';
import sideDrawerToggler from '../navigation/sidedrawerToggler';

const header = {
  render: () => {
    const headerDiv = createElement('div');
    headerDiv.id = 'header';
    headerDiv.className = '-transparentBg';
    const headerLogo = logo();
    const headerSideDrawerToggler = sideDrawerToggler.render();
    const headerNav = navigation([{ name: 'Create account', path: '/signup' }, { name: 'Sign in', path: '/signin' }], ['navigation__link', 'navigation__link-with-border']);

    headerDiv.appendChild(headerSideDrawerToggler);
    headerDiv.appendChild(headerLogo);
    headerDiv.appendChild(headerNav);

    return headerDiv;
  },
};

export default header;
