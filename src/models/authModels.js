import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'company', 'alumni', 'member', 'parent' ],
    default: 'user'
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
