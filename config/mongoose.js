const mongoose = require('mongoose');
// connecting to mongoose
mongoose.connect('mongodb+srv://akshita:ak1234@cluster0.aoxpnce.mongodb.net/habit-Tracker?retryWrites=true&w=majority&appName=Cluster0');
// mongoose database connection
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to MongoDb"));

db.once('open',function(){
    console.log('Connected to Database :: MondoDB');
});

module.exports=db;