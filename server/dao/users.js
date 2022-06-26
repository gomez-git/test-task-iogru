import User from '../models/User.js';
import encrypt from '../helpers/encrypt.js';

export const getAll = async () => {
  const users = await User.find();

  return users;
};

export const create = async (req) => {
  const { login, password } = req.body;
  if (!/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{7,}$/.test(password)) {
    throw new Error('Password can include only AZ, az, 09, .-');
  }
  const cryptoPassword = encrypt(password);
  const user = await User.create({ login, password: cryptoPassword });

  return user;
};

export const update = async (req) => {
  const { id } = req.params;
  const { login: newLogin, oldPassword, newPassword } = req.body;

  let updatedValues = {};
  let updatedValuesArray = [];

  if (newLogin) {
    updatedValues = { login: newLogin };
    updatedValuesArray = ['login'];
  }
  if (newPassword) {
    const { password } = await User.findById(id);
    if (encrypt(oldPassword) !== password) {
      throw new Error('Incorrect old password');
    }
    updatedValues = { ...updatedValues, password: encrypt(newPassword) };
    updatedValuesArray = [...updatedValuesArray, 'password'];
  }

  await User.validate({ ...updatedValues }, updatedValuesArray);
  const user = await User
    .updateOne({ _id: id }, { ...updatedValues, updated_at: Date.now() });

  return user;
};

export const del = async (req) => {
  const { id } = req.params;
  const user = await User.deleteOne({ _id: id });

  return user;
};
