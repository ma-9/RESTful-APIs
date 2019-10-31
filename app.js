// =============== Requiring Express ====================
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productROutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// =================== Executing express like a function =====================
const app = express();

// ======================= Body Parser ===============================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ====================== Logging Incoming Requests  ==========================
app.use(morgan('dev'));

// ======================= CORS Setup ===============================
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header(
            "Access-Control-Allow-Methods",
            "GET,POST,PATCH,DELETE,PUT");
        return res.status(200).json({});
    }
    next();
});

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