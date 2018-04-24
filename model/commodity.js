var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommoditySchema = new Schema({
    name:String,
    price:Number,
    imgSrc:String
});

module.exports = mongoose.model("Commodity",CommoditySchema,"commodities");