const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaTedSuitUnsuitables=require('../../database/schemas_enerjisa_api/schema_h_tedsuitunsuitables')

router.get('/tedsuitunsuitables-json',async(req,res)=>{
    await dbconnect()
    const schemaTedSuitUnsuitables=await SchemaTedSuitUnsuitables.find()
    res.json(schemaTedSuitUnsuitables)
})

module.exports=router