const express = require("express");
const router =  express.Router();
const mongoose  = require('mongoose');
// mongoose Schema importing here
const Product = require('../models/product');


router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});
router.post('/', (req, res, next) =>{
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });
    // it is method to store data in database
    product.save()
    .then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: "Handling POST requests to products",
        createdProduct:  product
    });
});
router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then( doc =>{
        console.log("From Database: ",doc);
        res.status(200).json({doc});
    })
    .catch( err =>{
        console.log(err);
        res.status(500).json({error: err});
    });
});
// patch 
router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Updated product!'
    });
})
// delete
router.delete('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Delete Product!'
    });
})
module.exports = router;

