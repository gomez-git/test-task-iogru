import User from '../models/User.js';
import encrypt from '../helpers/encrypt.js';
import validatePassword from '../helpers/passwordValidation.js';

export const authentication = async (req) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });

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
  const { login, password } = req.body;

  validatePassword(password);

  const user = await User.create({ login, password: encrypt(password) });

  return user;
};

export const update = async (req) => {
  const { id } = req.params;
  const { login: newLogin, oldPassword, newPassword } = req.body;

  let updatedValues = {};

  if (newLogin) {
    updatedValues = { login: newLogin };
    await User.validate({ ...updatedValues }, ['login']);
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

export const addToken = async (login, refreshToken) => {
  await User.updateOne({ login }, { refreshToken });

  return true;
};

export const deleteToken = async (refreshToken) => {
  await User.updateOne({ refreshToken }, { refreshToken: null });

  return true;
};
