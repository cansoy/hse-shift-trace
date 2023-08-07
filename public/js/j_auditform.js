const nameSurname=document.querySelector("#nameSurname")
const workerId=document.querySelector("#workerId")
const orderId=document.querySelector("#orderId")
const textArea=document.querySelector("#textarea")
const fileInput=document.querySelector("#fileInput")
const latitude=document.querySelector("#latitude")
const longitude=document.querySelector("#longitude")
const accuracy =document.querySelector("#accuracy")
const submitbtn=document.querySelector("#submitbtn")

window.addEventListener("DOMContentLoaded",()=>{
    navigator.geolocation.getCurrentPosition((success,failed)=>{
        if (failed) {
            alert("Konuma İzin Vermediniz !!!")
            window.location.href="/enerjisa/home"
            return
        }
        latitude.textContent=success.coords.latitude
        longitude.textContent=success.coords.longitude
        accuracy.textContent=success.coords.accuracy
    })
    submitbtn.addEventListener("click",fnSubmitForm)
})

const fnSubmitForm=()=>{
    let responseFormdata =null
    let responseImageData=null
    const formData ={
        nameSurname:nameSurname.textContent.split(" _")[0].trim(),
        workerId:workerId.textContent,
        orderId:orderId.textContent,
        textArea:textArea.value,
        latitude:latitude.textContent,
        longitude:longitude.textContent,
        accuracy:accuracy.textContent,
    }
    if (textArea.value==="") {
        alert("Lütfen kayıt formu için bir açıklama giriniz !")
        return
    }
    fetch("/enerjisa/auditform/formdata",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(formData)
    })
        .then(res=>{
            responseFormdata=res.status
            if (responseFormdata==200) {
                textArea.setAttribute("disabled","")
                submitbtn.style.backgroundColor="red"
                submitbtn.setAttribute("disabled","")
            }
        })
    

    const file =fileInput.files[0]
    if (file) {
        if (file.type.split("/")[0]!=="image") {
            alert("Lütfen Sadece Resim Yükleyiniz !")
            return  
        }
        if (file.size>14000000) {
            alert("Resim Boyutunuz Çok Büyük !")
            return  
        }
    }
    if (file) {
        const reader=new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload=()=>{
            const result =reader.result
            const blob =new Blob([result],{type:"image/*"})
            fetch("/enerjisa/auditform/imagedata",{
                method:"POST",
                headers:{
                    "content-type":"application/octet-stream",
                    "x-filetype":file.type.split("/")[1],
                    "x-orderid":workerId.textContent,
                    "x-latitude":latitude.textContent,
                    "x-longitude":longitude.textContent,
                    "x-accuracy":accuracy.textContent,
                },
                body:blob
            })
                .then(res=>{
                    responseImageData=res.status
                    if (responseImageData===200) {
                        fileInput.setAttribute("disabled","")
                    }
                })
        }
    }

}