const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    CustomerId: { type: mongoose.Types.ObjectId, ref:'Users', required: true},
    pizzaDetails: {type: Object, required: true},
    status:{type: String , default:'order_placed'}
},{timestamps: true});



module.exports = mongoose.model('Order',OrderSchema,'orders');;