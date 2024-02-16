const mongoose = require('mongoose');

const dbconnection = async ()=>{
    try{
        const connection = await mongoose.connect( "mongodb+srv://aabsar434:helloworld@cluster0.igll7zc.mongodb.net/PizzaDelivery");
        console.log(`connected to database ${connection.connection.host}`)
    }
    catch(e){
        console.log(`Error : ${e}`);
    }
}

module.exports = dbconnection;