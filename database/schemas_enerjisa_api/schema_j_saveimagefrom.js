const mongoose =require("mongoose")
const Schema=mongoose.Schema

const schemaImageSave=new Schema({
    imageBuffer:{type:Buffer},
    orderId:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    accuracy:{type:String},
    filetype:{type:String},
})
const SchemaImageSave=mongoose.model("SchemaImageSave",schemaImageSave)
module.exports=SchemaImageSave