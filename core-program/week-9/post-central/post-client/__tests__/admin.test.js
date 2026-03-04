import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllPosts,
  getUsers,
  deleteUserByAdmin,
} from '../src/services/admin.js';
import { BASE_URL } from '../src/services/constants.js';

function mockFetchResponse(data, { ok = true, status = 200 } = {}) {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(data),
    })
  );
}

function getFetchCallArgs() {
  const [url, options] = globalThis.fetch.mock.calls[0];
  return { url, ...options };
}

function getHeader(name) {
  const { headers } = getFetchCallArgs();
  if (typeof headers.get === 'function') {
    return headers.get(name);
  }
  const key = Object.keys(headers).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? headers[key] : undefined;
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getAllPosts', () => {
  it('should call GET /posts with Bearer token', async () => {
    const posts = [
      { id: 1, user: 'alice', text: 'Hello', timestamp: '2026-01-01T00:00:00Z' },
      { id: 2, user: 'bob', text: 'World', timestamp: '2026-01-02T00:00:00Z' },
    ];
    mockFetchResponse(posts);

    const result = await getAllPosts('admintoken');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/posts`);
    expect(call.method).toBe('GET');
    expect(getHeader('Authorization')).toBe('Bearer admintoken');

    expect(result).toEqual(posts);
  });

  it('should throw when not admin', async () => {
    mockFetchResponse(
      { error: 'Admin access required' },
      { ok: false, status: 403 }
    );

    try {
      await getAllPosts('usertoken');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('Admin access required');
      expect(error.status).toBe(403);
    }
  });
});

describe('getUsers', () => {
  it('should call GET /users with Bearer token', async () => {
    const users = [
      { user: 'alice', createdAt: '2026-01-01T00:00:00Z', lastLogin: '2026-01-02T00:00:00Z' },
      { user: 'bob', createdAt: '2026-01-01T00:00:00Z', lastLogin: '2026-01-03T00:00:00Z' },
    ];
    mockFetchResponse(users);

    const result = await getUsers('mytoken');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/users`);
    expect(call.method).toBe('GET');
    expect(getHeader('Authorization')).toBe('Bearer mytoken');

    expect(result).toEqual(users);
  });

  it('should throw for invalid token', async () => {
    mockFetchResponse(
      { error: 'Invalid token' },
      { ok: false, status: 401 }
    );

    try {
      await getUsers('badtoken');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('Invalid token');
      expect(error.status).toBe(401);
    }
  });
});

describe('deleteUserByAdmin', () => {
  it('should call DELETE /users/:name with Bearer token', async () => {
    mockFetchResponse({ message: 'User deleted' });

    const result = await deleteUserByAdmin('mytoken', 'alice');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/users/alice`);
    expect(call.method).toBe('DELETE');
    expect(getHeader('Authorization')).toBe('Bearer mytoken');

    expect(result.message).toBe('User deleted');
  });

  it('should encode the username in the URL', async () => {
    mockFetchResponse({ message: 'User deleted' });

    await deleteUserByAdmin('mytoken', 'user name');

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/users/user%20name`);
  });

  it('should not send a request body', async () => {
    mockFetchResponse({ message: 'User deleted' });

    await deleteUserByAdmin('mytoken', 'alice');

    const call = getFetchCallArgs();
    expect(call.body).toBeUndefined();
  });

  it('should throw when not admin', async () => {
    mockFetchResponse(
      { error: 'Forbidden' },
      { ok: false, status: 403 }
    );

    try {
      await deleteUserByAdmin('mytoken', 'alice');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('Forbidden');
      expect(error.status).toBe(403);
    }
  });

  it('should throw when user not found', async () => {
    mockFetchResponse(
      { error: 'User not found' },
      { ok: false, status: 404 }
    );

    try {
      await deleteUserByAdmin('mytoken', 'ghost');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('User not found');
      expect(error.status).toBe(404);
    }
  });
});
