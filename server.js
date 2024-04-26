const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
const DBConnect = require("./DBConnect");
const { default: mongoose } = require("mongoose");
DBConnect();
app.use(cors())

const expensesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type:Date}
})

let expenses = mongoose.model('Expenses', expensesSchema);
var arr = [
    {
        name: "prashadh",
        dept: "IT",
        rollno: "21ita37"
    }
]
app.get('/', async (req, res) => {
    const expense = await expenses.find();
    res.json(expense)
})

app.post('/add', (req, res) => {
    const { title, category, amount} = req.body
    const newItem = new expenses({ title, category, amount, date:new Date().toLocaleDateString()});
    newItem.save();
    res.status(200).json(newItem)

})

app.put('/update/:id', async (req, res) => {
    const _id = req.params.id;
    const update = await expenses.findByIdAndUpdate(_id , req.body);
    if(!update) return res.status(404).send("Id not found")
    res.status(200).send("Contant modified")

})
app.delete('/delete/:id', async (req, res) => {
    const _id = req.params.id;
    const deleteById = await expenses.findByIdAndDelete(_id , req.body);
    if(!deleteById) return res.status(404).send("Id not found")
    res.status(200).send("Contant Deleted")

})


app.listen(8000, () => {
    console.log("Server Started");
})