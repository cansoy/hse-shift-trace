const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaShiftTrace=require('../../database/schemas_enerjisa_api/schema_a_shiftTrace')
const SchemaEnsafeAudits=require('../../database/schemas_enerjisa_api/schema_b_ensafeaudits')
const SchemaEnsafeEvents=require('../../database/schemas_enerjisa_api/schema_c_ensafeevents')
const SchemaEnsafeNotifications=require('../../database/schemas_enerjisa_api/schema_d_ensafenotifications')
const SchemaTedSuit=require('../../database/schemas_enerjisa_api/schema_f_tedsuit')
const SchemaTedSuitUnsuitables=require('../../database/schemas_enerjisa_api/schema_h_tedsuitunsuitables')

let latitude;
let longitude;

let latitude_car;
let longitude_car;

router.post("/location-orders",async(req,res)=>{
    latitude=""
    longitude=""
    const body=req.body
    latitude=req.body.latitude 
    longitude=req.body.longitude
    res.end()
})

router.get("/location-orders",async(req,res)=>{
    if (!latitude && !longitude)  {
        res.redirect("/enerjisa/home")
        return
    }
    let strDataRegisterTime;
    await dbconnect()
    const operationData=await SchemaShiftTrace.find({}).lean()
    operationData.sort((a,b)=>a.ZWFM0064_IS_YERS-b.ZWFM0064_IS_YERS)
    const countOperationData=operationData.length
    if (countOperationData < 2)  {
        res.redirect("/enerjisa/home")
        return
    }
    if (operationData[0]) {
        const dataRegisterTime= operationData[0].SICIL_SON_SIPARISSAATI
        strDataRegisterTime=dataRegisterTime.toString()
    }
    else{
        strDataRegisterTime =""
    }
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const onLocationOperationData_first=operationData.filter(item=>item.HESAP_HEDEF_KONUMA_DURUM==="ŞUAN HEDEFTE")
    const onLocationOperationData_second=onLocationOperationData_first.filter(item=>item.MOBLZ_ARAC_ENLEM !=="YOK")
    const onLocationOperationData_verfied=onLocationOperationData_second.filter(item=>item.MOBLZ_ARAC_BOYLAM !=="YOK")

    const onLocationOperationData=onLocationOperationData_verfied.map((item,index)=>{  

        const earthRadiusKm = 6371
        // Convert latitude and longitude from degrees to radians
        const lat1Rad = (Math.PI / 180) * parseFloat(item.MOBLZ_ARAC_ENLEM.replace(",","."))
        const lon1Rad = (Math.PI / 180) * parseFloat(item.MOBLZ_ARAC_BOYLAM.replace(",","."))
        const lat2Rad = (Math.PI / 180) * parseFloat(String(latitude).replace(",","."));
        const lon2Rad = (Math.PI / 180) * parseFloat(String(longitude).replace(",","."));

        // Calculate differences between latitudes and longitudes
        const latDiff = lat2Rad - lat1Rad;
        const lonDiff = lon2Rad - lon1Rad;

        // Use the Haversine formula to calculate the great-circle distance
        const a = Math.sin(latDiff / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusKm * c;
        return {...item,_DISTANCE_:parseInt(distance)}
    })

    if (onLocationOperationData.length < 1)  {
        res.redirect("/enerjisa/home")
        return
    }
    onLocationOperationData.sort((a,b)=>a._DISTANCE_-b._DISTANCE_)
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const operationDataJustNames=onLocationOperationData.map((item,index)=>{
        return item.VAR_ADI_SOYAD.split(" _")[0]
    })
    const operationDataJustWorkerId=onLocationOperationData.map(item=>{
        return item.VAR_SICIL.trim()
    })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeAudits=await SchemaEnsafeAudits.find({})
    const ensafeAuditData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeAudits.forEach(audit=>{
            if (audit.nameSurname==name) {
                ensafeAuditData.push(audit)
            }
        })
    })
    const key = 'nameSurname';
    const uniqueEnsafeAuditData = [...new Map(ensafeAuditData.map(item => [item[key], item])).values()]
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeEvents=await SchemaEnsafeEvents.find({})
    const ensafeEventData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeEvents.forEach(event=>{
            if (event.nameSurname==name) {
                ensafeEventData.push(event)
            }
        })
    })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeNotifications=await SchemaEnsafeNotifications.find({})
        const ensafeNotificationData=[]
        operationDataJustNames.forEach(name=>{
            schemaEnsafeNotifications.forEach(notification=>{
                if (notification.nameSurname==name) {
                    ensafeNotificationData.push(notification)
                }
            })
        })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuit=await SchemaTedSuit.find({})
        const tedsuitMaindata=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuit.forEach(tedsuit=>{
                if (workerid==tedsuit.workerId) {
                    tedsuitMaindata.push(tedsuit)
                }
            })
        })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuitUnsuitables=await SchemaTedSuitUnsuitables.find({})
        const tedsuitUnsuitableData=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuitUnsuitables.forEach(tedsuit=>{
                if (tedsuit.workerId==workerid) {
                    tedsuitUnsuitableData.push(tedsuit)
                }
            })
        })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    res.render('./client/c_operations',{
        operationName:"TÜM OMLER",
        countOperationData:onLocationOperationData.length,
        operationData:onLocationOperationData,
        uniqueEnsafeAuditData:uniqueEnsafeAuditData,
        ensafeEventData:ensafeEventData,
        ensafeNotificationData:ensafeNotificationData,
        tedsuitMaindata:tedsuitMaindata,
        tedsuitUnsuitableData:tedsuitUnsuitableData,
        strDataRegisterTime:strDataRegisterTime
    })
})

router.post("/location-cars",async(req,res)=>{
    latitude_car=""
    longitude_car=""
    const body=req.body
    latitude_car=req.body.latitude 
    longitude_car=req.body.longitude
    res.end()
})

router.get("/location-cars",async(req,res)=>{
    if (!latitude_car && !longitude_car)  {
        res.redirect("/enerjisa/home")
        return
    }
    let strDataRegisterTime;
    await dbconnect()
    const operationData=await SchemaShiftTrace.find({}).lean()
    operationData.sort((a,b)=>a.ZWFM0064_IS_YERS-b.ZWFM0064_IS_YERS)
    const countOperationData=operationData.length
    if (countOperationData < 2)  {
        res.redirect("/enerjisa/home")
        return
    }
    if (operationData[0]) {
        const dataRegisterTime= operationData[0].SICIL_SON_SIPARISSAATI
        strDataRegisterTime=dataRegisterTime.toString()
    }
    else{
        strDataRegisterTime =""
    }
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const onLocationOperationData_first=operationData.filter(item=>item.MOBLZ_ARAC_ENLEM !=="YOK")
    const onLocationOperationData_verfied=onLocationOperationData_first.filter(item=>item.MOBLZ_ARAC_BOYLAM !=="YOK")

    const onLocationOperationData=onLocationOperationData_verfied.map((item,index)=>{  

        const earthRadiusKm = 6371
        // Convert latitude and longitude from degrees to radians
        const lat1Rad = (Math.PI / 180) * parseFloat(item.MOBLZ_ARAC_ENLEM.replace(",","."))
        const lon1Rad = (Math.PI / 180) * parseFloat(item.MOBLZ_ARAC_BOYLAM.replace(",","."))
        const lat2Rad = (Math.PI / 180) * parseFloat(String(latitude_car).replace(",","."));
        const lon2Rad = (Math.PI / 180) * parseFloat(String(longitude_car).replace(",","."));

        // Calculate differences between latitudes and longitudes
        const latDiff = lat2Rad - lat1Rad;
        const lonDiff = lon2Rad - lon1Rad;

        // Use the Haversine formula to calculate the great-circle distance
        const a = Math.sin(latDiff / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusKm * c;
        return {...item,_DISTANCE_:parseInt(distance)}
    })

    if (onLocationOperationData.length < 1)  {
        res.redirect("/enerjisa/home")
        return
    }
    onLocationOperationData.sort((a,b)=>a._DISTANCE_-b._DISTANCE_)
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const operationDataJustNames=onLocationOperationData.map((item,index)=>{
        return item.VAR_ADI_SOYAD.split(" _")[0]
    })
    const operationDataJustWorkerId=onLocationOperationData.map(item=>{
        return item.VAR_SICIL.trim()
    })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeAudits=await SchemaEnsafeAudits.find({})
    const ensafeAuditData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeAudits.forEach(audit=>{
            if (audit.nameSurname==name) {
                ensafeAuditData.push(audit)
            }
        })
    })
    const key = 'nameSurname';
    const uniqueEnsafeAuditData = [...new Map(ensafeAuditData.map(item => [item[key], item])).values()]
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeEvents=await SchemaEnsafeEvents.find({})
    const ensafeEventData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeEvents.forEach(event=>{
            if (event.nameSurname==name) {
                ensafeEventData.push(event)
            }
        })
    })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeNotifications=await SchemaEnsafeNotifications.find({})
        const ensafeNotificationData=[]
        operationDataJustNames.forEach(name=>{
            schemaEnsafeNotifications.forEach(notification=>{
                if (notification.nameSurname==name) {
                    ensafeNotificationData.push(notification)
                }
            })
        })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuit=await SchemaTedSuit.find({})
        const tedsuitMaindata=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuit.forEach(tedsuit=>{
                if (workerid==tedsuit.workerId) {
                    tedsuitMaindata.push(tedsuit)
                }
            })
        })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuitUnsuitables=await SchemaTedSuitUnsuitables.find({})
        const tedsuitUnsuitableData=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuitUnsuitables.forEach(tedsuit=>{
                if (tedsuit.workerId==workerid) {
                    tedsuitUnsuitableData.push(tedsuit)
                }
            })
        })
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    res.render('./client/c_operations',{
        operationName:"TÜM OMLER",
        countOperationData:onLocationOperationData.length,
        operationData:onLocationOperationData,
        uniqueEnsafeAuditData:uniqueEnsafeAuditData,
        ensafeEventData:ensafeEventData,
        ensafeNotificationData:ensafeNotificationData,
        tedsuitMaindata:tedsuitMaindata,
        tedsuitUnsuitableData:tedsuitUnsuitableData,
        strDataRegisterTime:strDataRegisterTime
    })
})


router.get('/:operation',async(req,res)=>{
    let strDataRegisterTime;
    await dbconnect()
    const operationName=req.params.operation
    const operationData=await SchemaShiftTrace.find({VAR_OPERASYON_MERKEZI:operationName})
    operationData.sort((a,b)=>a.ZWFM0064_IS_YERS-b.ZWFM0064_IS_YERS)
    const countOperationData=operationData.length
    if (operationData[0]) {
        const dataRegisterTime= operationData[0].SICIL_SON_SIPARISSAATI
        strDataRegisterTime=dataRegisterTime.toString()
    }
    else{
        strDataRegisterTime =""
    }
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const operationDataJustNames=operationData.map(item=>{
        return item.VAR_ADI_SOYAD.split(" _")[0]
    })
    const operationDataJustWorkerId=operationData.map(item=>{
        return item.VAR_SICIL.trim()
    })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeAudits=await SchemaEnsafeAudits.find({})
    const ensafeAuditData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeAudits.forEach(audit=>{
            if (audit.nameSurname==name) {
                ensafeAuditData.push(audit)
            }
        })
    })
    const key = 'nameSurname';
    const uniqueEnsafeAuditData = [...new Map(ensafeAuditData.map(item => [item[key], item])).values()]
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeEvents=await SchemaEnsafeEvents.find({})
    const ensafeEventData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeEvents.forEach(event=>{
            if (event.nameSurname==name) {
                ensafeEventData.push(event)
            }
        })
    })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeNotifications=await SchemaEnsafeNotifications.find({})
        const ensafeNotificationData=[]
        operationDataJustNames.forEach(name=>{
            schemaEnsafeNotifications.forEach(notification=>{
                if (notification.nameSurname==name) {
                    ensafeNotificationData.push(notification)
                }
            })
        })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuit=await SchemaTedSuit.find({})
        const tedsuitMaindata=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuit.forEach(tedsuit=>{
                if (workerid==tedsuit.workerId) {
                    tedsuitMaindata.push(tedsuit)
                }
            })
        })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuitUnsuitables=await SchemaTedSuitUnsuitables.find({})
        const tedsuitUnsuitableData=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuitUnsuitables.forEach(tedsuit=>{
                if (tedsuit.workerId==workerid) {
                    tedsuitUnsuitableData.push(tedsuit)
                }
            })
        })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    res.render('./client/c_operations',{
        operationName:operationName,
        countOperationData:countOperationData,
        operationData:operationData,
        uniqueEnsafeAuditData:uniqueEnsafeAuditData,
        ensafeEventData:ensafeEventData,
        ensafeNotificationData:ensafeNotificationData,
        tedsuitMaindata:tedsuitMaindata,
        tedsuitUnsuitableData:tedsuitUnsuitableData,
        strDataRegisterTime:strDataRegisterTime
    })
})

module.exports=router