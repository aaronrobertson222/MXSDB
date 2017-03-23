const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  accountLevel: {
    type: String,
    required: true,
    default: "user"
  },
  joinedDate: {type: Date, required: true},
  uploads: {type: Number, required: true, default: 0}
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username || '',
    name: `${this.firstName} ${this.lastName}` || '',
    userLevel: this.accountLevel,
    joinedDate: moment(this.joinedDate).format("MMM DD, YYYY"),
    uploads: this.uploads
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};
