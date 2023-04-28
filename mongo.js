const mongoose = require('mongoose');
const  Entity = require('./Models/Entity') 

const connectionString = process.env.MONGO_DB_URI;

mongoose.connect(connectionString)
.then(()=>{
    console.log("connected!")
}).catch(err=>(err)) 


//creation of entity 
/*
const ent = new Entity({
    name:'new ent',
    description:'new description'
})
*/
 
// saving the Entity on DB 
/* 
ent.save()
    .then( res=>{console.log(res);
                 mongoose.connection.close(); 
                })
*/
// search entity on db 
/*
Entity.find({}).then(res=>{
    console.log(res);
    mongoose.connection.close();
})
.catch(err=>{console.log( `catched error: ${err}` )})
*/

 