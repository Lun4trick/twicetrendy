import { Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },

  priceSale: {
    type: Number,
  },

  image: {
    type: String,
  },

  description: {
    type: String,
  },

  category: {
    type: String,
  },

  quantity: {
    type: Number,
  },

  inStock: {
    type: Boolean,
  },
  
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default productSchema;