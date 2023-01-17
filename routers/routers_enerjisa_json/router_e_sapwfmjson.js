const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaSapWfm=require('../../database/schemas_enerjisa_api/schema_e_sapwfm')

router.get('/sapwfm-json',async(req,res)=>{
    await dbconnect()
    const schemaSapWfm=await SchemaSapWfm.find()
    res.json(schemaSapWfm)
})

module.exports=router