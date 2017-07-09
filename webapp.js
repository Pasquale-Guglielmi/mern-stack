const express = require('express');
const app = express();
app.use(express.static('static'));

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log("Started server at port", port);
});
