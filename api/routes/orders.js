const router = require('express').Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Orders are Fetched'
    });
});

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message: 'Orders was created'
    });
});

router.get('/:orderID',(req,res,next)=>{
    res.status(200).json({
        message: 'Order Details',
        OrderID: req.params.orderID
    });
});

router.delete('/:orderID',(req,res,next)=>{
    res.status(200).json({
        message: 'Order Removed',
        OrderID: req.params.orderID
    });
});

module.exports = router;