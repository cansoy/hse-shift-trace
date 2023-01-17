const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaEnsafeEvents=require('../../database/schemas_enerjisa_api/schema_c_ensafeevents')

router.get('/ensafeevents-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeEvents=await SchemaEnsafeEvents.find()
    res.json(schemaEnsafeEvents)
})
module.exports=router