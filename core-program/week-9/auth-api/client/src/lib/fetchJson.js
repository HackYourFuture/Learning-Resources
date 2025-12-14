// Minimal JSON-only fetch wrapper
// - Always sends JSON body (if provided)
// - Always attempts to parse JSON response; falls back to HTTP status message
// Returns: { ok, status, data, message }

export default async function fetchJson(url, options = {}) {
  const { headers, body, ...rest } = options || {};

  const mergedHeaders = new Headers(headers || {});
  mergedHeaders.set('Content-Type', 'application/json');

  let response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: mergedHeaders,
      body: body != null ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      message: err?.message || 'Network error',
    };
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: `HTTP ${response.status}` };
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    message: data?.message || (response.ok ? '' : `HTTP ${response.status}`),
  };
}
