const mongoose=require('mongoose')
const express=require('express');
const route= require('./router/router');
const app=express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
 }));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin , X-Requested-With, Content-Type ,Accept,Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods' ,'GET ,POST ,PATCH ,DELETE')
    next()
})

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://testing:TXPxQZxsp8BSnQb9@cluster0.jhebhrt.mongodb.net/register")
.then(() => {
    console.log("MongoDb connected")
}).catch((err) => {
    console.log(err.message)
});

app.use('/' ,route)

app.listen( 4000 ,function(){
    console.log('App running on port ' + 4000 )
});