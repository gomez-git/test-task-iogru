import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.sendStatus(401);
      return;
    }
    const [method, token] = req.headers.authorization.split(' ');
    if (method !== 'Bearer') {
      res.status(400).json({ message: 'Unsupported auth header' });
      return;
    }
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;
    next();
  } catch ({ name, message }) {
    if (name === 'TokenExpiredError') {
      res.sendStatus(401);
      return;
    }
    if (name === 'JsonWebTokenError') {
      res.sendStatus(400);
      return;
    }
    if (name === 'NotBeforeError') {
      res.sendStatus(403);
      return;
    }
    res.status(500).json({ message });
  }
};
