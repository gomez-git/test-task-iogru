import User from '../models/User.js';
import encrypt from '../utils/encrypt.js';
import validatePassword from '../utils/passwordValidation.js';

export const authentication = async (req) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User doesn\'t exist');
  }
  if (encrypt(password) !== user.password) {
    throw new Error('Incorrect password');
  }

  return user;
};

export const getAll = async () => {
  const users = await User.find();

  return users;
};

export const create = async (req) => {
  const { username, password } = req.body;

  validatePassword(password);

  const user = await User.create({ username, password: encrypt(password) });

  return user;
};

export const update = async (req) => {
  const { id } = req.params;
  const { username: newUsername, oldPassword, newPassword } = req.body;

  let updatedValues = {};

  if (newUsername) {
    updatedValues = { username: newUsername };
    await User.validate(updatedValues, ['username']);
  }
  if (newPassword) {
    const { password } = await User.findById(id);
    if (encrypt(oldPassword) !== password) {
      throw new Error('Incorrect old password');
    }
    validatePassword(newPassword);
    updatedValues = { ...updatedValues, password: encrypt(newPassword) };
  }

  const user = await User
    .updateOne({ _id: id }, { ...updatedValues, updated_at: Date.now() });

  return user;
};

export const del = async (req) => {
  const { id } = req.params;
  const user = await User.deleteOne({ _id: id });

  return user;
};

export const addToken = async (username, refreshToken) => {
  await User.updateOne({ username }, { refreshToken });

  return true;
};

export const deleteToken = async (refreshToken) => {
  await User.updateOne({ refreshToken }, { refreshToken: null });

  return true;
};
