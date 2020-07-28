const request = require('request')

const openW = (lat,lon,callback) => {
    
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&appid=886a5c5409fc7d80daa96cf2af9851d5&units=metric`;



    request({url, json:true},(error,{body})=>{

        if(error){
            callback('No se puede establecer conexión con el servidor',undefined);
        }else if(body.message){
            callback('Ubicación no encontrada',undefined)

        }else{
            callback(undefined,`La temperatura es de ${body.main.temp} grados centígrados, con una humedad de ${body.main.humidity} g/m^³ y presión de ${body.main.pressure} Pa`);
               
        }    
    });
}

module.exports = openW;