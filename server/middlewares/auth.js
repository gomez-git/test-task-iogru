import { check } from '../dao/users.js';

export default async (req, res, next) => {
  try {
    await check(req);

    next();
  } catch (err) {
    if (err.message === 'User doesn\'t exist') {
      res.sendStatus(401);
      return;
    }
    if (err.message === 'Incorrect password') {
      res.sendStatus(403);
      return;
    }
    res.status(500).json({ message: err.message });
  }
};
