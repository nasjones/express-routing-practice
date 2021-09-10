const express = require("express");
const router = new express.Router();
const items = require('./fakeDb');
// const fs = require('fs')

// function myDbRead(){
//     return fs.readFile('./fakeDb.json',(err,data)=>{
//         if (err){
//             console.error(err)
//             return null
//         }
//         console.log(JSON.parse(data))
//         return JSON.parse(data);
//     })
// }

router.get('/',(req,res)=>{
    return res.json(items)
})

router.post('/',(req,res)=>{
    let item = req.body.item
    items.push(item)

    return res.json({"added":item})
})

router.get('/:name',(req,res)=>{ 
    let name = req.params.name
    let found = items.find(item => item["name"]==name)

    return res.json(found||{"error":"Item not found"})
})

router.patch('/:name',(req,res)=>{
    let newItem = req.body.item
    let name = req.params.name
    let index = items.findIndex(item=>item["name"]==name)
    if(index!=-1) items[index] = newItem

    return res.json({"updated":newItem})
})

router.delete('/:name',(req,res)=>{
    let name = req.params.name
    let index = items.findIndex(item=>item["name"]==name)
    if(index!=-1) items.splice(index,1)

    return res.json({"message":"Deleted"})
})

module.exports = router;