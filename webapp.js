const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var db;

app.get('/api/bugs', function(req, res) {
    db.collection("bugs").find().toArray(function(err, docs) {
        console.log(docs);
        res.json(docs);
    })
});

app.post('/api/bugs', function(req, res) {
    console.log("Req body: ", req.body);
    var newBug = req.body;
    db.collection("bugs").insertOne(newBug, function(err, result) {
        var newId = result.insertedId;
        db.collection("bugs").findOne({_id: newId}).then(function(rs) {
            res.json(rs);
        });
    });
})

MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbObject) {
    db = dbObject;
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log("Started server at port", port);
    });
});
