import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

morgan.token('ipv4', (req) => {
  const addr = req.ip || req.socket.remoteAddress || '';
  if (addr === '::1') return '127.0.0.1';
  return addr.replace(/^::ffff:/, '');
});

export const setupMiddleware = (app, __dirname) => {
  app.use(cors());
  app.use(morgan(':ipv4 :method :url :status :response-time ms - :res[content-length]'));
  app.use(express.json());
  app.use(
    '/client',
    express.static(path.join(__dirname, 'post-client'))
  );
  app.use('/portal', express.static(path.join(__dirname, 'portal')));

  // Set global JSON indentation to 2 spaces
  app.set('json spaces', 2);
};
