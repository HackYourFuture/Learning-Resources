export default class Page {
  #state;
  #view;
  #router;

  constructor(props) {
    this.#state = props.state;
    this.#router = props.router;
  }

  set view(value) {
    this.#view = value;
  }

  get root() {
    return this.#view.root;
  }

  get state() {
    return this.#state;
  }

  get router() {
    return this.#router;
  }

  pageDidMount() {
    this.#state.subscribe(this.#view);
  }

  pageWillUnmount() {
    this.#state.unsubscribe(this.#view);
  }
}
