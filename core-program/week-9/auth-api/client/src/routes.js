import HomePage from './pages/homePage.js';
import LoginPage from './pages/loginPage.js';
import RegisterPage from './pages/registerPage.js';
import RegisterSuccessPage from './pages/registerSuccessPage.js';

const routes = [
  { path: 'home', page: HomePage },
  { path: 'login', page: LoginPage, default: true },
  { path: 'register', page: RegisterPage },
  { path: 'register-success', page: RegisterSuccessPage },
];

export default routes;
