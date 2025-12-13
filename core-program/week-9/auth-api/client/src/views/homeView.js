import getElementsWithIds from '../util/getElementsWithIds.js';
import ModalDialogView from './modalDialogView.js';

export default class HomeView {
  #props;
  #root;
  #dom;
  #modalView;
  #sideNavInstances;

  constructor(props) {
    this.#props = props;
    this.#root = document.createElement('div');
    this.#root.innerHTML = String.raw`
      <div class="row">
        <div class="col s12 m8 offset-m2 l6 offset-l3">
          <nav>
            <div class="nav-wrapper">
              <div class="col s12">
                <a href="#" class="brand-logo">Auth API</a>
                <a href="#" data-target="mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                  <li><a href="#" id="logoutBtn">Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <ul class="sidenav" id="mobile">
            <li><a href="#" id="mobileLogoutBtn">Logout</a></li>
          </ul>
          <h5>Welcome to the Authentication API Demo App</h5>
          <p>This is a simple application demonstrating user authentication using JWT.</p>
          <p id="profile"></p>
        </div>
      </div>
    `;

    this.#modalView = new ModalDialogView({ title: 'Error' });
    this.#root.append(this.#modalView.root);

    this.#dom = getElementsWithIds(this.#root);

    const sideNavElements = this.#root.querySelectorAll('.sidenav');
    this.#sideNavInstances = M.Sidenav.init(sideNavElements);

    this.#dom.logoutBtn.addEventListener('click', this.#logoutHandler);
    this.#dom.mobileLogoutBtn.addEventListener('click', this.#logoutHandler);
  }

  #logoutHandler = (e) => {
    e.preventDefault();
    this.#sideNavInstances[0].close();
    this.#props.onLogout();
  };

  update(state) {
    this.#dom.profile.textContent = state.profile;
    this.#modalView.update(state);
  }

  get root() {
    return this.#root;
  }
}
