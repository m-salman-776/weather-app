const express = require('express')
const { request } = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast')
// direct content to web page on query


// app.get('',(req,res)=>{
//     res.send('<h1> Weather </h1>')
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1> about page')
// })
// app.get('/help',(req,res) => {
//     res.send('<h1>this is help page</h1>')
// })
// app.get('*',(req,res) => {
//     res.send('<h1> this is error page</h1>')
// })

// serving static content 


// console.log(__dirname)
// console.log(__filename)
const publicDirectory = path.join(__dirname,'../public')
app.use(express.static(publicDirectory)) // regering public dir to express as it is default for express to serve

// app.get('',(req,res) =>{ // this not neceesary if you you are using index.html
//     res.send() // here arg of send used to pass object arg for handlebar
// })
// app.get('/help',(req,res) => {
//     res.send()
// })
// app.get('/about',(req,res) =>{
//     res.send()
// })

// serving dynamic content using handle bar

// defining path variables
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.set('view engine','hbs') // view engine need to be set
app.get('',(req,res) => {
    res.render('index')
})
app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'salman'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'salman'
    })
})
// app.get('/weather',(req,res) =>{
//     res.render('weather')
// })
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        res.send({
            error:'Address needed !'
        })
        return;
    }
    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error) return res.send({
            error
        })
        forcast(lattitude,longitude,(error,{observation_time,temparature,country,city}={})=>{
            if(error) return res.send({
                error
            })
            res.send({
                location,
                country,
                city,
                temparature,
                observation_time
            })
        })
    })
})
app.get('*',(req,res) =>{
    res.render('error')
})
app.listen(3000,()=>{
    console.log('server is up and running')
})