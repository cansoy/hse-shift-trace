const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaEnsafeAudits=require('../../database/schemas_enerjisa_api/schema_b_ensafeaudits')

router.get('/ensafeaudits-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeAudits=await SchemaEnsafeAudits.find()
    res.json(schemaEnsafeAudits)
})

module.exports=router