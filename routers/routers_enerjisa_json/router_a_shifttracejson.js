const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaShiftTrace=require('../../database/schemas_enerjisa_api/schema_a_shiftTrace')

router.get('/shifttrace-json',async(req,res)=>{
    await dbconnect()
    const schemaShiftTrace=await SchemaShiftTrace.find()
    res.json(schemaShiftTrace)
})

module.exports=router