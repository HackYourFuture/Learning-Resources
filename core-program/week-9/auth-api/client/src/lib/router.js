class Router {
  #routes;
  #pageRoot;
  #currentPage = {};

  constructor(routes, pageRoot) {
    this.#routes = routes;
    this.#pageRoot = pageRoot;
    this.#currentPage = {};

    window.addEventListener('hashchange', () => this.#onHashChange());
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

  async #onHashChange() {
    const [pathname, ...params] = this.#getRouteParts();

    // Find the page corresponding to the current hash value
    let route = this.#findRouteByPathname(pathname);

    // If not found, redirect to login page
    if (!route) {
      route = 'login';
    }

    // Call optional willUnload lifecycle method.
    if (this.#currentPage.pageWillUnload) {
      this.#currentPage.pageWillUnload();
    }

    // Create the page corresponding to the route.
    let newPage = new route.page(...params);
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
    if (newPage.pageDidLoad) {
      newPage.pageDidLoad();
    }

    this.#currentPage = newPage;
  }

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

export default new Router();
