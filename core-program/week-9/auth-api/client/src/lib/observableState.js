export default class ObservableState {
  #state = {};
  #subscribers = new Set();

  #notify() {
    console.log(this.#state);

    this.#subscribers.forEach((subscriber) =>
      subscriber.update({ ...this.#state })
    );
  }

  subscribe(subscriber) {
    if (!('update' in subscriber)) {
      throw new Error('Subscriber must implement update(state)');
    }
    this.#subscribers.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.#subscribers.delete(subscriber);
  }

  update(updates) {
    this.#state = { ...this.#state, ...updates };
    this.#notify();
  }

  get() {
    return { ...this.#state };
  }

  set(nextState) {
    this.#state = { ...nextState };
    this.#notify();
  }

  clear() {
    this.#state = {};
    this.#notify();
  }
}
