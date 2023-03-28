import mongoose from 'mongoose';

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

const parentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  children: [childSchema]
});

const Parent = mongoose.model('Parent', parentSchema);

export default Parent;
