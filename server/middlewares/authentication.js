import { authentication } from '../dao/users.js';

export default async (req, res, next) => {
  try {
    await authentication(req);

    next();
  } catch ({ message }) {
    if (message === 'User doesn\'t exist' || message === 'Incorrect password') {
      res.status(400).json({ message });
      return;
    }
    res.status(500).json({ message });
  }
};
