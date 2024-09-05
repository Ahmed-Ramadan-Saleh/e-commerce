const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const newproduct = new Schema({
  productname: String,
  discription: String,
  price: Number,
  count: Number,
  images: Array,
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now },
  category: String,
  orderstatus: {
    orderid: String,
    status: String,
    estimateddelivery: String,
    currentlocation: String,
    trackingdetails: {
      orderreceived: String,
      orderprocessed: String,
      shipped: String,
      outfordelivery: String,
    },
  },
});

const createproduct = mongoose.model("product", newproduct);

module.exports = createproduct;
