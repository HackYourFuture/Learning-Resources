import { BASE_URL } from './constants.js';

/**
 * Get a hello message from Post Central (no auth required).
 * @returns {Promise<{id: number, user: string, text: string, timestamp: string}>} The hello post
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: GET /posts/hello
 */
export async function getHello() {
  const response = await fetch(`${BASE_URL}/posts/hello`);
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * Log in a user.
 * @param {string} name - The username
 * @param {string} password - The password
 * @returns {Promise<{user: string, token: string}>} The logged-in user and token
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: POST /users/login
 * Request body: { name, password }
 */
export async function login(name, password) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * Register a new user.
 * @param {string} name - The desired username
 * @param {string} password - The desired password
 * @returns {Promise<{user: string, token: string}>} The registered user and token
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: POST /users/register
 * Request body: { name, password }
 */
export async function register(name, password) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * Get the current user's profile.
 * @param {string} token - The JWT token
 * @returns {Promise<{user: string}>} The user profile
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: GET /users/me
 * Headers: Authorization: Bearer <token>
 */
export async function getProfile(token) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * Get the current user's posts.
 * @param {string} token - The JWT token
 * @returns {Promise<Array<{id: number, user: string, text: string, timestamp: string, isEdited?: boolean}>>} The user's posts
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: GET /posts/me
 * Headers: Authorization: Bearer <token>
 */
export async function getMyPosts(token) {
  const response = await fetch(`${BASE_URL}/posts/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * Create a new post.
 * @param {string} token - The JWT token
 * @param {string} text - The post content
 * @returns {Promise<{id: number, user: string, text: string, timestamp: string}>} The created post
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: POST /posts
 * Headers: Authorization: Bearer <token>
 * Request body: { text }
 */
export async function createPost(token, text) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * Edit an existing post.
 * @param {string} token - The JWT token
 * @param {number} id - The post ID to edit
 * @param {string} text - The updated post content
 * @returns {Promise<{id: number, user: string, text: string, timestamp: string, isEdited: true}>} The updated post
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: PUT /posts/:id
 * Headers: Authorization: Bearer <token>
 * Request body: { text }
 */
export async function editPost(token, id, text) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

/**
 * Delete a post.
 * @param {string} token - The JWT token
 * @param {number} id - The post ID to delete
 * @returns {Promise<{id: number, user: string, text: string, timestamp: string, message: string}>} The deleted post info
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: DELETE /posts/:id
 * Headers: Authorization: Bearer <token>
 */
export async function deletePost(token, id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}
