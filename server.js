require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const budget = require("./models/budget.js");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');


//middleware
app.use(express.urlencoded({extended: false}));
app.use("/static", express.static("public"));
app.use(methodOverride("_method"));
app.use("/static", express.static("public"))


//routes
app.get("/",(req, res)=> {
    res.send(`hello world`)
});

app.get("/budgets", (req, res)=>{
     let totalAmount = budget.reduce((total, item) => {
     return parseInt(total) + parseInt(item.amount);
    })
 let sum1= budget.map(item => item.amount)
 console.log(sum1)
const bankAccount = sum1.reduce((a, b) => a+b, 0);
console.log(bankAccount)
var color="";
if(bankAccount <= 0) {
    color="red"
}else if (bankAccount >= 1000){
    color="blue"
}
res.render('index.ejs', {allBudgets: budget, 
bankA: bankAccount,
col:color,})
})

// show route
app.get("/budgets/new",(req, res) => {
    res.render('new.ejs', {budgets: budget[req.params.id]})
})

app.get("/budgets/:id",(req, res)=> {
    res.render('show.ejs', {budgets: budget[req.params.id]});
});


app.post('/budgets',(req, res) => {
    req.body.params = !!req.body.params
    console.log(req.body);
    budget.push(req.body);
    console.log(budget);
    res.redirect('/budgets')

});



app.listen(PORT, () => {
    console.log(`we are listening on port ${PORT}`)
});