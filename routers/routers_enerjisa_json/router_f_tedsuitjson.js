const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaTedSuit=require('../../database/schemas_enerjisa_api/schema_f_tedsuit')

router.get('/tedsuit-json',async(req,res)=>{
    await dbconnect()
    const schemaTedSuit=await SchemaTedSuit.find()
    res.json(schemaTedSuit)
})

module.exports=router