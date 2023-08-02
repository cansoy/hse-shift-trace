const locationcontainer=document.querySelector(".locationcontainer")

navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      const a =document.createElement("a")
        a.href=`https://www.google.com/search?q=${latitude}%2C${longitude}&oq=${latitude}%2C${longitude}`
        a.target="_blank"
        a.textContent=`Show On Google Latitude: ${latitude}, Longitude: ${longitude}`
        container.append(a)
        // fetch("http://127.0.0.1:3000/client-api/location-data",{
        //   method:"POST",
        //   headers:{"content-type":"application/json"},
        //   body:JSON.stringify({lati:latitude,long:longitude})
        // })
        //   .then(res=>{
        //     console.log(res)
        //     return res.json()
        //   })
        //   .then(data=>{
        //     console.log(data)
        //   })
    },
    (error) => {
      console.error("Error getting location:", error.message);
    }
    
  );