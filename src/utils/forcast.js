const request = require('request')
const forcast = (lattitude,longitude,callback_function)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9f0258d3cfc5e3d3c1fbc36e49e4487c&query='+lattitude+','+longitude+'&units=f'
    request({url:url,json:true},(error,{ body }={})=>{ // destructuring here
        if(error){
            callback_function('unable to connect ro servers',undefined)
        }
        else if(body.error){
            callback_function('unable to find location',undefined);
        }
        else{
            callback_function(undefined,{
                observation_time:body.current.observation_time,
                temperature:body.current.temperature,
                country:body.location.country,
                city:body.location.name
                // observation_time : response.body.current.observation_time, // earlier we were using response
                // temperature : response.body.current.temperature, // we destructured is to use body directly
                // country:response.body.location.country,
                // city:response.body.location.name
            })
        }
    })
}
module.exports=forcast