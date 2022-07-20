import { authentication } from '../dao/users.js';

export default async (req, res, next) => {
  try {
    const user = await authentication(req);
    res.locals.user = user;
    next();
  } catch ({ message }) {
    if (message === 'User doesn\'t exist' || message === 'Incorrect password') {
      res.status(400).json({ message });
      return;
    }
    res.status(500).json({ message });
  }
};
