import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const DeviceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  type: String,
  brand: String,
  os: String,
  model: String,
  modelNumber: String,
});

export const User = mongoose.model('User', UserSchema);
export const Device = mongoose.model('Device', DeviceSchema);
