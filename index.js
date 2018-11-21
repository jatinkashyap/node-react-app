const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send({'hi' : 'bye'});
});

app.listen(5000);