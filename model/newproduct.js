const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const newproduct = new Schema({
    productname:String,
    discription:String,
    price:Number,
    count:Number,
    images:Array,
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now },
})

const createproduct = mongoose.model("product", newproduct);

module.exports = createproduct;

