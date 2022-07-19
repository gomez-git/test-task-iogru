import jwt from 'jsonwebtoken';
import { addToken, deleteToken } from '../dao/users.js';

const generateToken = (payload, secret, opts = {}) => jwt.sign(payload, secret, opts);

export const login = async (req, res) => {
  try {
    const { login: user } = req.body;
    const accessToken = generateToken({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = generateToken({ user }, process.env.REFRESH_TOKEN_SECRET);
    await addToken(user, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await deleteToken(refreshToken);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
