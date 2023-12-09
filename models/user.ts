import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  verified: {
    type: Boolean,
    default: false
  },

  newsletter: {
    type: Boolean,
    default: false
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: Number,
    default: null
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
  },

  address: {
    city: {
      type: String,
      default: ''
    },
    zip: {
      type: String,
      default: ''
    },
    street: {
      type: String,
      default: ''
    },
    houseNumber: {
      type: String,
      default: ''
    },
    floorDoor: {
      type: String,
      default: ''
    },
  },

  cart: {
    items: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    }
  },

  orders: {
    type: Array,
    default: []
  },

  fullfilledOrders: {
    type: Array,
    default: []
  },

  coupons: {
    type: Array,
    default: []
  },

  verifyToken: {
    type: String,
    default: undefined
  },

  verifyTokenExpiration: {
    type: Date,
    default: undefined
  },
},
  {
    timestamps: true
  });

const User = models.User || mongoose.model('User', userSchema);

export default User;