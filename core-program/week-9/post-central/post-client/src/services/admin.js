import { BASE_URL } from './constants.js';

/**
 * Get all posts (admin only).
 * @param {string} token - The JWT token
 * @returns {Promise<Array<{id: number, user: string, text: string, timestamp: string}>>} All posts
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: GET /posts
 * Headers: Authorization: Bearer <token>
 */
export async function getAllPosts(token) {
  const response = await fetch(`${BASE_URL}/posts`, {
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
 * Get all users (admin is filtered out by the server).
 * @param {string} token - The JWT token
 * @returns {Promise<Array<{user: string, createdAt: string, lastLogin: string}>>} The users
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: GET /users
 * Headers: Authorization: Bearer <token>
 */
export async function getUsers(token) {
  const response = await fetch(`${BASE_URL}/users`, {
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
 * Delete a user by name (admin only).
 * @param {string} token - The JWT token
 * @param {string} name - The username to delete
 * @returns {Promise<{message: string}>} Confirmation message
 * @throws {Error} With a `status` property (HTTP status code) on failure
 *
 * API endpoint: DELETE /users/:name
 * Headers: Authorization: Bearer <token>
 */
export async function deleteUserByAdmin(token, name) {
  const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(name)}`, {
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
