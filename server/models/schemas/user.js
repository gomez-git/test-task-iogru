import mongoose from 'mongoose';

const { Schema } = mongoose;

export default new Schema({
  login: {
    type: String,
    required: 'Login is required field',
    unique: true,
    minLength: 6,
    maxLength: 20,
    match: [
      /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{5,19}$/,
      'Login can include only AZ, az, 09, .-',
    ],
  },
  password: {
    type: String,
    required: 'Password is required field',
  },
  refreshToken: String,
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
