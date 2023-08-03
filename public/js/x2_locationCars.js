const locationCars=document.querySelector(".location-cars")

locationCars.addEventListener("click",async(e)=>{
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if (!latitude && !longitude) {
                locationCars.textContent="Kordinatlarınız Alınamıyor !"
                locationCars.style.backgroundColor="red"
                setTimeout(()=>{
                    locationCars.style.backgroundColor="#D7BDE2"
                },2000)
                return
            }

            fetch("/enerjisa/om/location-cars",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({latitude:latitude,longitude:longitude})
            })
            .then(res=>{
                if (res.status===200){
                    window.location.href="/enerjisa/om/location-cars"
                }
            })
            

        })

})