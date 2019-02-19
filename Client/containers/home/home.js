import '@babel/polyfill';
import header from '../../components/header/header';
import backdrop from '../../components/UI/backdrop';
import sidenav from '../../components/navigation/sidenav';
import mainHome from '../../components/mainHome/mainHome';

const home = {
  render: async () => {
    const root = document.getElementById('root');
    const backdropComponent = await backdrop.render();
    const sidenavComponent = await sidenav.render([{ name: 'Create account', path: '/signup' }, { name: 'Sign in', path: '/signin' }]);
    const headerComponent = await header.render();
    const mainHomeComponent = await mainHome.render();
    root.appendChild(backdropComponent);
    root.appendChild(sidenavComponent);
    root.appendChild(headerComponent);
    root.appendChild(mainHomeComponent);
  },
};

export default home;
