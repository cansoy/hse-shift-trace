const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaEnsafeNotifications=require('../../database/schemas_enerjisa_api/schema_d_ensafenotifications')

router.get('/ensafenotifications-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeNotifications=await SchemaEnsafeNotifications.find()
    res.json(schemaEnsafeNotifications)
})

module.exports=router