import chalk from 'chalk';
import { getReasonPhrase } from 'http-status-codes';

// Request logging middleware
export function requestLogger(req, res, next) {
  console.log(chalk.magenta(`\nReceived request: ${req.method} ${req.url}`));
  if (req.body) {
    console.log(
      chalk.magenta(`Request body: ${JSON.stringify(req.body, null, 2)}`)
    );
  } else {
    console.log(chalk.gray('Request body: <empty>'));
  }
  next();
}

// Response logging middleware
export function responseLogger(req, res, next) {
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    const message = `Response status: ${res.statusCode} ${getReasonPhrase(
      res.statusCode
    )}`;
    const bodyMsg = `Response body: ${JSON.stringify(data, null, 2)}`;
    if (res.statusCode >= 400) {
      console.log(chalk.red(message));
      console.log(chalk.red(bodyMsg));
    } else {
      console.log(chalk.green(message));
      console.log(chalk.green(bodyMsg));
    }
    return originalJson(data);
  };
  next();
}
