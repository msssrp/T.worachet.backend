const express = require('express')
const router = express.Router()
const Restaurant = require('../model/restaurant.model')

router.post('/restaurants',(req,res)=>{
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
    })
    
    Restaurant.create(newRestaurant , (err , result)=>{
        if(err){
            return res.status(500).send({
                msg:err.message || "some error on Internal server"
            })
        }
        res.send(result)
    })
})

router.get("/restaurants",(req,res)=>{
    Restaurant.getAll((result,err)=>{
        if(err){
            return res.status(500).send({
                msg:err.message || "some error on Internal server"
            })
        }
        res.send(result)
    })
})

router.get('/restaurants/:id',(req,res)=>{
    const id = req.params['id']
    Restaurant.getByID(id , (result , err)=>{
        if(err){
            return res.status(500).send({
                msg:err.message || "some error on Interal server"
            })
        }
        res.send(result)
    })
})

router.put('/restaurants/:id',(req,res)=>{
    const id = req.params['id']
    const newRestaurant = new Restaurant({
        name:req.body.name,
        type: req.body.type,
        image: req.body.image
    })
    Restaurant.updateByID(id,newRestaurant , (result ,err)=>{
        if(err){
            return res.status(500).send({
                msg:err.message || "some error on Internal server"
            })
        }
        res.send(result)
    })
})

router.delete('/restaurants/:id' , (req,res)=>{
    const id = req.params['id']
    Restaurant.deleteByID(id,(result,err)=>{
        if(err){
            return res.status(500).send({
                msg:err.message || "some error on Internal server"
            })
        }
        res.send(result)
    })
})

module.exports = router