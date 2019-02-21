import createElement from '../tools/createElement';
import logo from '../UI/logo';
import navigation from '../navigation/navigation';
import sideDrawerToggler from '../navigation/sidedrawerToggler';

const header = {
  render: (linksProps, linksClasses, headerBg) => {
    const headerDiv = createElement('div');
    headerDiv.id = 'header';
    headerDiv.className = headerBg;
    const headerLogo = logo();
    const headerSideDrawerToggler = sideDrawerToggler.render();
    const headerNav = navigation(linksProps, linksClasses);

    headerDiv.appendChild(headerSideDrawerToggler);
    headerDiv.appendChild(headerLogo);
    headerDiv.appendChild(headerNav);

    return headerDiv;
  },
};

export default header;
