import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  id: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
   password: {
    type: String,
    required: true
   },
   city: String,
   zipCode: String,
   mobileNumber: String,
   addressLine1: String,
},
{
  timestamps: true
});

const User = models.User || mongoose.model('User', userSchema);

export default User;