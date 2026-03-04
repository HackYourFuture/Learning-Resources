import AdminPage from './pages/adminPage.js';
import HomePage from './pages/homePage.js';
import LoginPage from './pages/loginPage.js';
import RegisterPage from './pages/registerPage.js';
import RegisterSuccessPage from './pages/registerSuccessPage.js';

const routes = [
  { path: 'admin', page: AdminPage },
  { path: 'home', page: HomePage },
  { path: 'login', page: LoginPage },
  { path: 'register', page: RegisterPage },
  { path: 'register-success', page: RegisterSuccessPage },
];

export default routes;
