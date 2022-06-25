import User from '../models/User.js';

export const getAll = async () => {
  const users = await User.find();

  return users;
};

export const create = async (req) => {
  const { login, password } = req.body;
  const user = await User.create({ login, password });

  return user;
};

export const update = async (req) => {
  const { id } = req.params;
  const { login: newLogin, password } = req.body;
  await User.validate({ login: newLogin, password }, ['login', 'password']);
  const user = await User
    .updateOne({ _id: id }, { login: newLogin, password, updated_at: Date.now() });

  return user;
};

export const del = async (req) => {
  const { id } = req.params;
  const user = await User.deleteOne({ _id: id });

  return user;
};
