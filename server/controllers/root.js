import jwt from 'jsonwebtoken';
import { create } from '../dao/users.js';

const generateToken = (payload, secret, opts = {}) => jwt.sign(payload, secret, opts);

export default class RootController {
  static async signup(req, res) {
    try {
      const user = await create(req);

      res.status(201).json(user);
    } catch ({ code, message }) {
      if (code === 11000) {
        res.status(400).json({ message: 'Username already taken' });
        return;
      }
      if (/^Password/.test(message)) {
        res.status(400).json({ message });
        return;
      }
      res.status(500).json({ message });
    }
  }

  static async signin(_req, res) {
    try {
      const { _id: id } = res.locals.user;
      const token = generateToken({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
