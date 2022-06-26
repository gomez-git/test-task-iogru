import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    if (!token) {
      res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
