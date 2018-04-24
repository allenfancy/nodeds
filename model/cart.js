var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CartSchema = new Schema({
    uId:{type:String},
    cId:{type:String},
    cName:{type:String},
    cPrice:{type:String},
    cImgSrc:{type:String},
    cQuantity:{type:Number},
    cStatus:{type:Boolean,default:false}
});

module.exports = mongoose.model("Cart",CartSchema,"carts");