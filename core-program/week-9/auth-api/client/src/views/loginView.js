import getViewIds from '../util/getViewIds.js';
import createModalDialView from './modalDialogView.js';

function createLoginView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <div class="container">
      <div class="row">
        <div class="col s10 offset-s1 m6 offset-m3 z-depth-1 user-panel">
          <form id="form" class="col s12">
            <h5 class="user-title">Login</h5>
            <div class="input-field">
              <label for="username">Username</label>
              <input type="text" class="validate" id="username"/>
            </div>
            <div class="input-field" >
              <label for="password">Password</label>
              <input type="password" class="validate" id="password" />
            </div>
            <input type="submit" class="waves-effect waves-light btn user-submit-btn"/>
            <div>
              <p>Not yet registered? 
              <a href="#"
                style="text-decoration: none;" id="registerLink">
                Create an account
              </a>
            </p>
          </div>
          </form>
        </div>
      </div>
    </div>    
  `;

  const modalView = createModalDialView({ title: 'Login Failed' });
  root.append(modalView.root);

  const dom = getViewIds(root);

  dom.form.addEventListener('submit', (event) => {
    event.preventDefault();
    props.onSubmit(dom.username.value, dom.password.value);
  });

  dom.registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    props.onRegister();
  });

  const update = (state) => {
    modalView.update(state);
  };

  return { root, update };
}

export default createLoginView;
