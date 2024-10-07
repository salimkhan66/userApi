const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hashPassword: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(v) {
        return /^(?=.*[!@#$%^&*])/.test(v); // At least one special character
      },
      message: props => `${props.value} must contain at least one special character!`
    }
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Email format validation
  },
  phoneNumber: {
    type: String,
    required: true,
  },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
