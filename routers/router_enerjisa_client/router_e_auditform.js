const express=require("express")
const router =express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaShiftTrace=require("../../database/schemas_enerjisa_api/schema_a_shiftTrace")
const SchemaEnsafeAudits=require("../../database/schemas_enerjisa_api/schema_b_ensafeaudits")
const SchemaEnsafeEvents=require("../../database/schemas_enerjisa_api/schema_c_ensafeevents")
const SchemaTedSuitUnsuitables=require("../../database/schemas_enerjisa_api/schema_h_tedsuitunsuitables")
const SchemaAuditForm=require("../../database/schemas_enerjisa_api/schema_i_saveauditform")
const SchemaImageSave=require("../../database/schemas_enerjisa_api/schema_j_saveimagefrom")

const fs =require("fs")

router.get("/:orderid/:workerid/:namesurname",async(req,res)=>{
    const orderid=req.params.orderid
    const workerid=req.params.workerid
    const namesurname=req.params.namesurname

    let existOrder=null
    await dbconnect()
    if (orderid!=="YOK") {
        existOrder=await SchemaShiftTrace.find({ZWFM0064_SIPARIS:orderid}).lean()
    }
    if (orderid==="YOK") {
        existOrder=["YOK"]
    }
    const existAudits=await SchemaEnsafeAudits.find({nameSurname:namesurname})
    const existEvents=await SchemaEnsafeEvents.find({nameSurname:namesurname})
    const existTedSuitUnsutables=await SchemaTedSuitUnsuitables.find({workerId:workerid})
    res.render("./client/e_auditform",
        {
            existOrder:existOrder[0],
            existAudits:existAudits,
            existEvents:existEvents,
            existTedSuitUnsutables:existTedSuitUnsutables
        }
    )
})

router.post("/formdata",async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
        req.flash('dbConnectionError','DB Connection Failed')
        res.redirect('/enerjisaapi/ensafeaudits')
        return
    }

    try {
        const formdata=req.body
        const schemaAuditForm=new SchemaAuditForm({
            nameSurname:formdata.nameSurname,
            workerId:formdata.workerId,
            orderId:formdata.orderId,
            textArea:formdata.textArea,
            latitude:formdata.latitude,
            longitude:formdata.longitude,
            accuracy:formdata.accuracy,
        })
        await schemaAuditForm.save()
        res.end()
    } catch (error) {
        console.log(error)
        res.end()
    }
    
})

router.post("/imagedata",async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
        req.flash('dbConnectionError','DB Connection Failed')
        res.redirect('/enerjisaapi/ensafeaudits')
        return
    }

    const imagedata=req.body
    const headers=req.headers
    const buffer =Buffer.from(imagedata.data)
    const orderId=req.headers["x-orderid"]
    const latitude=req.headers["x-latitude"]
    const longitude=req.headers["x-longitude"]
    const accuracy=req.headers["x-accuracy"]
    const filetype=req.headers["x-filetype"]
    await SchemaImageSave.deleteMany({})
    const schemaImageSave=new SchemaImageSave({
        imageBuffer:buffer,
        orderId:orderId,
        latitude:latitude,
        longitude:longitude,
        accuracy:accuracy,
        filetype:filetype
    })
    await schemaImageSave.save()
    
    res.end()
})




module.exports=router