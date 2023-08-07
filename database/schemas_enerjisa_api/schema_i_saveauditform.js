const mongoose=require("mongoose")
const Schema=mongoose.Schema

const schemaAuditForm=new Schema({
    nameSurname:{type:String},
    workerId:{type:String},
    orderId:{type:String},
    textArea:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    accuracy:{type:String},
})

const SchemaAuditForm=mongoose.model('SchemaAuditForm',schemaAuditForm)
module.exports=SchemaAuditForm