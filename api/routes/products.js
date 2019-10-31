// ============= Importing Dependencies ==============
const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

// ================= Handling Requests =============
router.get('/',(req,res,next)=>{
    Product.find()
        .exec()
        .then((docs) => {
            if(docs.length > 0){
                console.log("From Database" + docs);
                res.status(200).json(docs);
            }else{
                console.log('No Products ');
                res.status(400).json({
                    message: "No Products"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.post('/',(req,res,next)=>{
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Hey, It is a POST request...',
                CreatedProduct: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });

});

router.get('/:ProductID',(req,res,next)=>{
    const id = req.params.ProductID;
    Product.findById(id)
        .exec()
        .then((doc) => {
            if(doc){
                console.log("From Database" + doc);
                res.status(200).json(doc);
            }else{
                console.log('404 Product Not Found ');
                res.status(400).json({
                    message: "404 Product Not Found"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:ProductID',(req,res,next)=>{
    const id = req.params.ProductID;
    const updateOps = {};
    for(const Ops of req.body){
        updateOps[Ops.propName] = Ops.value;
    }
    Product.updateOne({_id: id},{ $set: updateOps})
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:ProductID',(req,res,next)=>{
    const id = req.params.ProductID;
    Product.remove({_id:id})
        .exec()
        .then((result) => {
            console.log('Product Deleted');
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// ================ Exporting Router =====================
module.exports = router;