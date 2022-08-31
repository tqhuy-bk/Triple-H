const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/huunguyencs/image/upload/v1648397898/default-avatar_np2xqa.webp'
    },
    background: {
      type: String,
      default:
        'https://res.cloudinary.com/huunguyencs/image/upload/v1648397899/MF1esV_rzs9vx.webp'
    },
    phone: {
      type: String
    },
    role: {
      type: Number,
      default: 0
    },
    gender: {
      type: String,
      default: 'male'
    },
    birthday: Date,
    confirmAccount: {
      type: mongoose.Types.ObjectId,
      ref: 'confirms'
    },
    hobbies: String,
    address: {
      type: String,
      default: ''
    },
    followings: [{ type: mongoose.Types.ObjectId, ref: 'users' }], // nguoi minh theo doi
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }], //nguoi khac theo doi minh
    tourSaved: [{ type: mongoose.Types.ObjectId, ref: 'tours' }],
    is_new: {
      type: Boolean,
      default: true
    },
    state: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.index(
  {
    fullname: 'text',
    email: 'text',
    email: 'text',
    phone: 'text',
    hobbies: 'text',
    address: 'text'
  },
  {
    name: 'User text index',
    weights: {
      fullname: 8,
      username: 6,
      email: 7,
      phone: 7,
      hobbies: 6,
      address: 4
    }
  }
);

module.exports = mongoose.model('users', userSchema);
