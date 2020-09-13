const request = require('request')
const geocode = (address,callback)=>{
    address = encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidXNlcjc1NzZ4IiwiYSI6ImNrZWsxbjNsaDBvdnEyeHBpNmkwNWRoYWcifQ.Cq5eeuX8_k9CTdMzhZ-Hww'
    request({url:url,json:true},(error,{body} = {})=>{
        if(error){
            callback('error unable to connect to the servers',undefined);
        }
        else if(body.message || body.features.length == 0){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                lattitude: body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name,
            })
        }
    })
}
module.exports = geocode