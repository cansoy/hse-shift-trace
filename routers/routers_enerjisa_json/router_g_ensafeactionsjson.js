const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaEnsafeActions=require('../../database/schemas_enerjisa_api/schema_g_ensafeactions')

router.get('/ensafeactions-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeActions=await SchemaEnsafeActions.find()
    res.json(schemaEnsafeActions)
})

module.exports=router