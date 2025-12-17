export function requestLogger(req, res, next) {
  console.log(`\nReceived request: ${req.method} ${req.url}`);
  next();
}

export function responseLogger(req, res, next) {
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    console.log(`Response status: ${res.statusCode}`);
    console.log(`Response body: ${JSON.stringify(data, null, 2)}`);
    return originalJson(data);
  };
  next();
}
