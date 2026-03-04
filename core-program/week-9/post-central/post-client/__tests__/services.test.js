import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  login,
  register,
  getProfile,
  getMyPosts,
  createPost,
  editPost,
  deletePost,
} from '../src/services/services.js';
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

function getParsedBody() {
  const { body } = getFetchCallArgs();
  return JSON.parse(body);
}

function getHeader(name) {
  const { headers } = getFetchCallArgs();
  // Support both plain objects and Headers instances
  if (typeof headers.get === 'function') {
    return headers.get(name);
  }
  // Case-insensitive lookup for plain objects
  const key = Object.keys(headers).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? headers[key] : undefined;
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('login', () => {
  it('should call POST /users/login with name and password', async () => {
    mockFetchResponse({ user: 'alice', token: 'jwt123' });

    const result = await login('alice', 'secret');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/users/login`);
    expect(call.method).toBe('POST');
    expect(getHeader('Content-Type')).toBe('application/json');

    const body = getParsedBody();
    expect(body.name).toBe('alice');
    expect(body.password).toBe('secret');

    expect(result.user).toBe('alice');
    expect(result.token).toBe('jwt123');
  });

  it('should throw on failed login', async () => {
    mockFetchResponse(
      { error: 'Invalid credentials' },
      { ok: false, status: 401 }
    );

    try {
      await login('alice', 'wrong');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('Invalid credentials');
      expect(error.status).toBe(401);
    }
  });
});

describe('register', () => {
  it('should call POST /users/register with name and password', async () => {
    mockFetchResponse({ user: 'bob', token: 'jwt456' });

    const result = await register('bob', 'pass123');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/users/register`);
    expect(call.method).toBe('POST');
    expect(getHeader('Content-Type')).toBe('application/json');

    const body = getParsedBody();
    expect(body.name).toBe('bob');
    expect(body.password).toBe('pass123');

    expect(result.user).toBe('bob');
    expect(result.token).toBe('jwt456');
  });

  it('should throw when user already exists', async () => {
    mockFetchResponse(
      { error: 'User already exists' },
      { ok: false, status: 409 }
    );

    try {
      await register('bob', 'pass123');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('User already exists');
      expect(error.status).toBe(409);
    }
  });
});

describe('getProfile', () => {
  it('should call GET /users/me with Bearer token', async () => {
    mockFetchResponse({ user: 'alice' });

    const result = await getProfile('mytoken');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/users/me`);
    expect(call.method).toBe('GET');
    expect(getHeader('Authorization')).toBe('Bearer mytoken');

    expect(result.user).toBe('alice');
  });

  it('should throw for invalid token', async () => {
    mockFetchResponse(
      { error: 'Invalid token' },
      { ok: false, status: 401 }
    );

    try {
      await getProfile('badtoken');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('Invalid token');
      expect(error.status).toBe(401);
    }
  });
});

describe('getMyPosts', () => {
  it('should call GET /posts/me with Bearer token', async () => {
    const posts = [
      { id: 1, user: 'alice', text: 'Hello', timestamp: '2026-01-01T00:00:00Z' },
    ];
    mockFetchResponse(posts);

    const result = await getMyPosts('mytoken');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/posts/me`);
    expect(call.method).toBe('GET');
    expect(getHeader('Authorization')).toBe('Bearer mytoken');

    expect(result).toEqual(posts);
  });
});

describe('createPost', () => {
  it('should call POST /posts with Bearer token and text body', async () => {
    const post = {
      id: 1,
      user: 'alice',
      text: 'New post',
      timestamp: '2026-01-01T00:00:00Z',
    };
    mockFetchResponse(post);

    const result = await createPost('mytoken', 'New post');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/posts`);
    expect(call.method).toBe('POST');
    expect(getHeader('Authorization')).toBe('Bearer mytoken');
    expect(getHeader('Content-Type')).toBe('application/json');

    const body = getParsedBody();
    expect(body.text).toBe('New post');

    expect(result.text).toBe('New post');
  });
});

describe('editPost', () => {
  it('should call PUT /posts/:id with Bearer token and text body', async () => {
    const post = {
      id: 5,
      user: 'alice',
      text: 'Updated',
      timestamp: '2026-01-01T01:00:00Z',
      isEdited: true,
    };
    mockFetchResponse(post);

    const result = await editPost('mytoken', 5, 'Updated');

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/posts/5`);
    expect(call.method).toBe('PUT');
    expect(getHeader('Authorization')).toBe('Bearer mytoken');
    expect(getHeader('Content-Type')).toBe('application/json');

    const body = getParsedBody();
    expect(body.text).toBe('Updated');

    expect(result.isEdited).toBe(true);
  });

  it('should throw when editing another user\'s post', async () => {
    mockFetchResponse(
      { error: 'Forbidden' },
      { ok: false, status: 403 }
    );

    try {
      await editPost('mytoken', 99, 'Hacked');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error.message).toBe('Forbidden');
      expect(error.status).toBe(403);
    }
  });
});

describe('deletePost', () => {
  it('should call DELETE /posts/:id with Bearer token', async () => {
    const post = {
      id: 3,
      user: 'alice',
      text: 'Goodbye',
      timestamp: '2026-01-01T00:00:00Z',
      message: 'Post deleted',
    };
    mockFetchResponse(post);

    const result = await deletePost('mytoken', 3);

    expect(globalThis.fetch).toHaveBeenCalledOnce();

    const call = getFetchCallArgs();
    expect(call.url).toBe(`${BASE_URL}/posts/3`);
    expect(call.method).toBe('DELETE');
    expect(getHeader('Authorization')).toBe('Bearer mytoken');

    expect(result.message).toBe('Post deleted');
  });

  it('should not send a request body', async () => {
    mockFetchResponse({ id: 3, message: 'Post deleted' });

    await deletePost('mytoken', 3);

    const call = getFetchCallArgs();
    expect(call.body).toBeUndefined();
  });
});
