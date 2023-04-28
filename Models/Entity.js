const { Schema , model}=require('mongoose') 

const entitySchema = new Schema({
    name:String,
    description:String
})

const Entity = model('Entity',entitySchema);

module.exports = Entity
