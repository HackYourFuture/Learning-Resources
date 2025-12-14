export default class Router {
  #routes;
  #pageRoot;
  #currentPage = {};
  #state;

  constructor(state) {
    this.#state = state;
    window.addEventListener('hashchange', this.#onHashChange);
  }

  #getRouteParts() {
    // Example:
    // '#repos/HackYourFuture/my-repo' => ['repos', 'HackYourFuture', 'my-repo']
    const [hash, ...rest] = decodeURI(window.location.hash).split('/');
    const path = hash.replace('#', '');
    return [path, ...rest];
  }

  #findRouteByPathname(pathname) {
    return this.#routes.find((route) => route.path === pathname);
  }

  #onHashChange = async () => {
    const [pathname, ...params] = this.#getRouteParts();

    // Find the page corresponding to the current hash value
    let route = this.#findRouteByPathname(pathname);

    // If not found, redirect to login page
    if (!route) {
      route = 'login';
    }

    // Call optional willUnload lifecycle method.
    if (this.#currentPage.pageWillUnmount) {
      this.#currentPage.pageWillUnmount();
    }

    // Create the page corresponding to the route.
    let newPage = new route.page({ router: this, params, state: this.#state });
    if (typeof newPage !== 'object') {
      throw new Error(`Page ${pathname} did not return an object`);
    }

    // Clear the content of the pageRoot container and append the page
    // root element as its new child.
    this.#pageRoot.innerHTML = '';
    this.#pageRoot.appendChild(newPage.root);

    // Reset scroll position to top of page
    window.scrollTo(0, 0);

    // Call optional didLoad lifecycle method.
    if (newPage.pageDidMount) {
      newPage.pageDidMount();
    }

    this.#currentPage = newPage;
  };

  initialize(routes, pageRoot) {
    this.#routes = routes;
    this.#pageRoot = pageRoot;
  }

  start() {
    this.#onHashChange();
  }

  navigateTo(path, ...params) {
    const encodedHash = encodeURI('#' + [path, ...params].join('/'));
    window.location.assign(encodedHash);
  }
}
