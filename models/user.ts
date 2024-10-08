import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },

  lastName: {
    type: String,
    default: ''
  },

  verified: {
    type: Boolean,
    default: false
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },

  phone: {
    type: Number,
    default: null
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
  },

  consents: {
      terms: {
        accepted: {
          type: Boolean,
          default: false,
        },
        updatedAt: {
          type: Date,
          default: undefined
        },
      },

      marketingEmails: {
        accepted: {
          type: Boolean,
          default: false,
        },
        updatedAt: {
          type: Date,
          default: undefined
        },
      },

      gdpr: {
        accepted: {
          type: Boolean,
          default: false,
        },
        updatedAt: {
          type: Date,
          default: undefined
        },
      },

      marketingCookies: {
        accepted: {
          type: Boolean,
          default: false,
        },
        updatedAt: {
          type: Date,
          default: undefined
        },
      },

      esentialCookies: {
        accepted: {
          type: Boolean,
          default: false,
        },
        updatedAt: {
          type: Date,
          default: undefined
        },
      },

      analyticsCookies: {
        accepted: {
          type: Boolean,
          default: false,
        },
        updatedAt: {
          type: Date,
          default: undefined
        },
      },
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

  newRegToken: {
    type: String,
    default: undefined
  },

  newRegTokenExpiration: {
    type: Date,
    default: undefined
  },
},
  {
    timestamps: true
  });

const User = models.User || mongoose.model('User', userSchema);

export default User;