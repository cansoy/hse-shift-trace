const locationcontainer=document.querySelector(".locationcontainer")
const location1=document.querySelector(".location-1")

navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy=position.coords.accuracy
      const a =document.createElement("a")
        a.href=`https://www.google.com/search?q=${latitude}%2C${longitude}&oq=${latitude}%2C${longitude}`
        a.target="_blank"
        a.textContent=`Google da Yerimi Kontrol Et ( ${accuracy.toFixed(0)}mt )`
        location1.append(a)
    },
    (error) => {
      console.error("Error getting location:", error.message);
    }
  );