// ============= Creating Router from Express ==============
const router = require('express').Router();

// ================= Handling Requests =============
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Hey, It is a GET request...'
    });
});

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message: 'Hey, It is a POST request...'
    });
});

router.get('/:ProductID',(req,res,next)=>{
    const id = req.params.ProductID;
    if(id === 'Special'){
        res.status(200).json({
            message: 'You have encountered a Speacial ID',
            ID: id
        });
    }else{
        res.status(200).json({
            message: 'You have entered an ID'
        });
    }
});

router.patch('/:ProductID',(req,res,next)=>{
    res.status(200).json({
        message: 'Product Updated'
    });
});

router.delete('/:ProductID',(req,res,next)=>{
    res.status(200).json({
        message: 'Product Deleted'
    });
});

// ================ Exporting Router =====================
module.exports = router;