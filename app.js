// =============== Requiring Express ====================
const express = require('express');

// =================== Executing express like a function =====================
const app = express();

// =================== Handling a request ================================
app.use((req,res,next)=>{
    res.status(200).json({
        "Id":"17031",
        "Message":"It Works Manav !!"
    })
});

// ===================== Exporting app =====================
module.exports = app;