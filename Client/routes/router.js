import '@babel/polyfill';
import utils from '../utils/utils';
import home from '../containers/home/home';
import signup from '../containers/signup/signup';
import signin from '../containers/signin/signin';
import removeAllRootChildNode from '../components/tools/removeAllChildNode';

const routes = {
  '/': home,
  '/signup': signup,
  '/signin': signin,
};

const router = async () => {
  const parsedUrl = utils.parseRequestURL();
  const page = routes[parsedUrl] ? routes[parsedUrl] : '404 Error';
  await removeAllRootChildNode();
  await page.render();
};

export default router;
