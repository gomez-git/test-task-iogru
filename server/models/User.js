import mongoose from 'mongoose';
import userSchema from './schemas/user.js';

const { model } = mongoose;

const User = model('User', userSchema);

export default User;
