const path =require('path')
const fs=require('fs')
require('dotenv').config({path:path.join(__dirname,'./.env')})
const express=require('express')
const session=require('express-session')
const flash=require('connect-flash')
const cookieParser=require('cookie-parser')
const cookie=require('cookie')
const helmet=require('helmet')
const xssClean=require('xss-clean')
const hpp=require('hpp')
const mongoSanitize=require('express-mongo-sanitize')
const uuid=require('uuid')
const server=express()
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const router_a_shifttraceapi=require('./routers/routers_enerjisa_api/router_a_shifttrace')
const router_b_ensafeauditsapi=require('./routers/routers_enerjisa_api/router_b_ensafeaudits')
const router_c_ensafeeventsapi=require('./routers/routers_enerjisa_api/router_c_ensafeevents')
const router_d_ensafenotificationsapi=require('./routers/routers_enerjisa_api/router_d_ensafenotifications')
const router_e_sapwfmapi=require('./routers/routers_enerjisa_api/router_e_sapwfm')
const router_f_tedsuitapi=require('./routers/routers_enerjisa_api/router_f_tedsuit')
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT=process.env.PORT || 3000
server.use(express.json({limit:'50mb'}))
server.use(express.urlencoded({extended:true,limit:'50mb'}))
server.use(express.static(path.join(__dirname,'./public')))
server.set('view engine','ejs')
server.set('views',path.join(__dirname,'./views'))
server.use(session({
    name:'cansoy',
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    genid:function(){
        return uuid.v4()
    },
    cookie:{
        httpOnly:true,
        sameSite:'strict',
        maxAge:1000 * 60 * 60 * 24,
        secure:false,
    }
}))
server.use(flash())
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.use(helmet())
server.use(xssClean())
server.use(hpp())
server.use(mongoSanitize())
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.use('/enerjisaapi',router_a_shifttraceapi)
server.use('/enerjisaapi',router_b_ensafeauditsapi)
server.use('/enerjisaapi',router_c_ensafeeventsapi)
server.use('/enerjisaapi',router_d_ensafenotificationsapi)
server.use('/enerjisaapi',router_e_sapwfmapi)
server.use('/enerjisaapi',router_f_tedsuitapi)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(PORT,()=>{
    console.log('//////////////////////////////////////////////////////////////////////////////////////////')
})