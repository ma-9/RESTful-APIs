// =============== Requiring Express ====================
const express = require('express');
const morgan = require('morgan');
const productROutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// =================== Executing express like a function =====================
const app = express();

// ====================== Usage of Morgan ==============================
app.use(morgan('dev'));

// =================== Handling a request ================================
app.use('/products',productROutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


// ===================== Exporting app =====================
module.exports = app;