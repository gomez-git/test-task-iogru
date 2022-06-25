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
      /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{6,20}$/,
      'Login can include only AZ, az, 09, .-',
    ],
  },
  password: {
    type: String,
    required: 'Password is required field',
    minLength: 8,
    match: [
      /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{8,}$/,
      'Password can include only AZ, az, 09, .-',
    ],
  },
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
