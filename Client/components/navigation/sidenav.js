import createElement from '../tools/createElement';
import img from '../../assets/images/user.png';

const sidenav = {

  render: (links) => {
    const sidenavTag = createElement('nav');
    sidenavTag.className = 'sidenav-wrapper sidenav-wrapper--is-close';
    sidenavTag.id = 'sidenavWrapper';

    const sidenavHeader = createElement('div');
    sidenavHeader.className = '-col-sm-12 sidenav-wrapper__header';
    const sidenavPictureHolder = createElement('div');
    sidenavPictureHolder.className = 'sidenav-wrapper__picture-holder';
    const sidenavPictureHolderImg = createElement('img');
    sidenavPictureHolderImg.src = img;

    const sideNav = createElement('ul');
    sideNav.className = 'sidenav';
    links.map((link) => {
      const sideNavItem = createElement('li');
      sideNavItem.className = 'sidenav__item';
      const sideNavLink = createElement('a');
      sideNavLink.className = 'sidenav__item-link';
      sideNavLink.href = `#${link.path}`;
      sideNavLink.innerHTML = link.name;
      sideNavItem.appendChild(sideNavLink);
      sideNav.appendChild(sideNavItem);
    });

    sidenavPictureHolder.appendChild(sidenavPictureHolderImg);
    sidenavHeader.appendChild(sidenavPictureHolder);
    sidenavTag.appendChild(sidenavHeader);
    sidenavTag.appendChild(sideNav);

    return sidenavTag;
  },
};


export default sidenav;
