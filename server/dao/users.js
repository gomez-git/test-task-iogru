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

export const getOne = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = res.locals.user;
  if (id !== userId) {
    throw new Error('Access denied');
  }
  const user = await User.findById(id);

  return user;
};

export const getAll = () => User.find();

export const create = async (req) => {
  const { username, password } = req.body;

  validatePassword(password);

  const user = await User.create({ username, password: encrypt(password) });

  return user;
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = res.locals.user;
  if (id !== userId) {
    throw new Error('Access denied');
  }
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

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = res.locals.user;
  if (id !== userId) {
    throw new Error('Access denied');
  }
  await User.deleteOne({ _id: req.params.id });
};
