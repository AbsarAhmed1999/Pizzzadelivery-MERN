const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
    name:{type: String, required:true},
    img: {type: String,required:true},
    PizzaBase:[],
    ['Pizza Sauce']:[],
    Veggies:[],
    description:{type:String},

},
{
    timestamps: true
});

module.exports = mongoose.model('pizza',pizzaSchema,'Pizza');