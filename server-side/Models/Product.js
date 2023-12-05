const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    require: true,
  },
  Sizes: {
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userOwnerName: {
    type: String,
    ref: "User",
    required: true,
  }
});
const productModel = mongoose.model("product", productSchema);
module.exports = productModel 