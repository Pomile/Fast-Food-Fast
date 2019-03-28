import validateEmail from '../emailValidation';


const signin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const isValid = validateEmail(email.value);

  if (isValid) {
    fetch('http://localhost:8000/api/v1/auth/signin', {
      method: 'post',
      body: JSON.stringify({
        email: email.value, password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then((data) => {
      console.log(data);
      if (data.isAuth) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('date', Date());
        localStorage.setItem('isAuth', true);
        window.location.href = `http://${window.location.host}/#/user`;
      }
    });
  }
};

export default signin;
