import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  tokenSeed: String,
  // email: { type: String, unique: true },
});

UserSchema.methods.passwordHashCreate = function(password) {
  return bcrypt.hash(password, 8)
    .then(hash => {
      this.passwordHash = hash;
      return this;
    });
};

UserSchema.methods.passwordHashCompare = function(password) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, this.passwordHash)
      .then(isCorrect =>
        isCorrect ? resolve(this) : reject()))
}

UserSchema.methods.tokenSeedCreate = function() {
  this.tokenSeed = crypto.randomBytes(32).toString('hex');
  return this;
}

export const User = mongoose.model('User', UserSchema);

User.create = credentials => {
  const { username, password, email } = credentials;
  return new Promise((resolve, reject) =>
    new User({ username }).tokenSeedCreate().passwordHashCreate(password)
      .then(user => user.save()
        .then(res => resolve(res))
        .catch(err => reject(err))));
}
