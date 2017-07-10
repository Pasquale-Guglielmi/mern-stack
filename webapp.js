const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

var bugs = [
    {
        id: 1,
        priority: 'P1',
        status: 'Open',
        owner: 'Andy',
        title:'App crashes on refresh'
    },
    {
        id: 2,
        priority: 'P1',
        status: 'New',
        owner: 'John',
        title: 'Misaligned border on panel'
    }];

app.get('/api/bugs', function(req, res) {
    res.json(bugs);
});

app.post('/api/bugs', function(req, res) {
    console.log("Req body: ", req.body);
    var newBug = req.body;
    newBug.id = bugs.length + 1;
    bugs.push(newBug);
    res.json(newBug);
})

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log("Started server at port", port);
});
