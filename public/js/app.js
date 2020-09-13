

// const fetch = require('node-fetch')
// const url = 'http://localhost:3000/weather?address=germany'
// fetch(url).then((response)=>{
//     response.json().then((data)=>{
//        console.log(data)
//     })
// })
console.log('hello it works')
const form = document.querySelector('form')
const address = document.querySelector('input')
const p1 = document.querySelector("#p1")
const p2 = document.querySelector("#p2")
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const url = 'http://localhost:3000/weather?address='+address.value
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        console.log(data)
       
       if(data.error) p1.textContent = data.error
    //    else{
        p1.textContent = address.value
           p1.textContent = data.location
           p2.textContent = data.temparature
           console.log(data.temparature)
    //    }
    })
})
})