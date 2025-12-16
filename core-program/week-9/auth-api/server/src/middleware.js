import { getReasonPhrase } from 'http-status-codes';

// Request logging middleware
export function requestLogger(req, res, next) {
  console.log(`\nReceived request: ${req.method} ${req.url}`);
  if (req.body) {
    console.log(`Request body: ${JSON.stringify(req.body, null, 2)}`);
  } else {
    console.log('Request body: <empty>');
  }
  next();
}

// Response logging middleware
export function responseLogger(req, res, next) {
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    console.log(
      `Response status: ${res.statusCode} ${getReasonPhrase(res.statusCode)}`
    );
    console.log(`Response body: ${JSON.stringify(data, null, 2)}`);
    return originalJson(data);
  };
  next();
}
