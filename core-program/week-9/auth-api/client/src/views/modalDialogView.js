export default class ModalDialogView {
  #root;
  #dom = {};
  #modalInstances;

  constructor(props) {
    this.#root = document.createElement('div');
    this.#root.innerHTML = String.raw`
      <!-- Modal Structure: https://materializecss.com/modals.html -->
    <div class="modal">
      <div class="modal-content">
        <h4>${props.title}</h4>
        <p id="modal-text"></p>
      </div>
      <div class="modal-footer">
        <button class="modal-close waves-effect waves-green btn-flat">Close</button>
      </div>
    </div>        
  `;

    this.#dom.modalText = this.#root.querySelector('#modal-text');

    const modalElements = this.#root.querySelectorAll('.modal');
    this.#modalInstances = M.Modal.init(modalElements);
  }

  update(state) {
    if (state.error) {
      this.#dom.modalText.textContent = state.error;
      this.#modalInstances[0].open();
    }
  }

  get root() {
    return this.#root;
  }
}
