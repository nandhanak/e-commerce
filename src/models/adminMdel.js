const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
  // Fields related to managing products
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  // Fields related to managing sellers
  sellers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  }],
 
 
  
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  // Other fields related to admin profile or preferences
{ timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
