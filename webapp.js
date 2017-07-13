const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.use(express.static('static'));
app.use(bodyParser.json());

var db;

app.get('/api/bugs', function(req, res) {
    var filter = {};
    (req.query.priority) && (filter.priority = req.query.priority);
    (req.query.status) && (filter.status = req.query.status);
    db.collection("bugs").find(filter).toArray(function(err, docs) {
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
