const express=require("express")
const router =express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaShiftTrace=require("../../database/schemas_enerjisa_api/schema_a_shiftTrace")
const SchemaEnsafeAudits=require("../../database/schemas_enerjisa_api/schema_b_ensafeaudits")
const SchemaEnsafeEvents=require("../../database/schemas_enerjisa_api/schema_c_ensafeevents")
const SchemaTedSuitUnsuitables=require("../../database/schemas_enerjisa_api/schema_h_tedsuitunsuitables")

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





module.exports=router