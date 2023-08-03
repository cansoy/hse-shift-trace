const locationOrders=document.querySelector(".location-orders")

locationOrders.addEventListener("click",async(e)=>{
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if (!latitude && !longitude) {
                locationOrders.textContent="Kordinatlarınız Alınamıyor !"
                locationOrders.style.backgroundColor="red"
                setTimeout(()=>{
                    locationOrders.style.backgroundColor="#D7BDE2"
                },2000)
                return
            }

            fetch("/enerjisa/om/location-orders",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({latitude:latitude,longitude:longitude})
            })
            .then(res=>{
                if (res.status===200){
                    window.location.href="/enerjisa/om/location-orders"
                }
            })

        })

})