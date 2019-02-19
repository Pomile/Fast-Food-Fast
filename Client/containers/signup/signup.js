import '@babel/polyfill';

const signup = {
  render: async () => {
    const root = document.getElementById('root');
    const header1 = document.createElement('h1');
    header1.innerHTML = 'Sign up page';
    root.appendChild(header1);
  },
};

export default signup;
