const mongoose = require("mongoose")

function DBConnect(){
    mongoose.connect("mongodb+srv://prashadh:UZqnWkGqROiTsRs8@cluster0.w1uwrvn.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0",{
    }).then((con)=>{
        console.log("Connect to Database")
    })
}

module.exports = DBConnect