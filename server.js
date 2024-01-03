const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const indexRouter=require('./routes/index')
const mongoose = require('mongoose')

if(process.env.node_env!=='Production'){ 
    require('dotenv').config()
}

mongoose.connect(process.env.database_url,  {useNewUrlParser : true})
const db=mongoose.connection
db.on('error', error => console.error('db connection error'))
db.once('open', ()=> console.log('connected to mongo'))

app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)
app.listen(process.env.PORT || 3001)