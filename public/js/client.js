import { UI } from "./UI.js";

UI.shiftTraceWorkerIds.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerId=e.target.dataset.workerId
        const reponse=await fetch('/enerjisaapi/shifttrace-json')
        const data =await reponse.json()
        const workerIdData=data.filter(shiftdata=>shiftdata.VAR_SICIL==workerId)
        const workerIdDataHtml=workerIdData.map(item=>{
            return `<div class="created-detail-table">
                        <br>
                        <div class="detail-column">
                            <span class="row">Telefon Numarası:</span>
                            <span class="row">${item.VAR_TELEFON_NO}</span>
                        </div>
                        <br>
                        <hr>
                        <div class="detail-column">
                           <span class="row">Kullandığı Araç:</span>
                           <span class="row">${item.VAR_ARAC_PLAKASI}</span>
                        </div>
                        <br>
                        <hr>
                        <div class="detail-column">
                           <span class="row">Kullandığı Araç:</span>
                           <span class="row">${item.VAR_ARAC_PLAKASI}</span>
                        </div>
                    </div>
                    `
        })
        UI.detailPanel.innerHTML=workerIdDataHtml.join("")
        UI.detailPanel.classList.add('detail-show-shifttrace')
        const createdNewTable=document.querySelector(".created-detail-table")
        createdNewTable.classList.add('flex-detail-table')
    })
})

UI.body.addEventListener('click',()=>{
    UI.detailPanel.innerHTML=""
    UI.detailPanel.classList.remove('detail-show-shifttrace')
})