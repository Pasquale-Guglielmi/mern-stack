
var db = new Mongo().getDB("bugsdb");
db.bugs.remove({});

db.bugs.insert([
        {
            priority: 'P1',
            status: 'Open',
            owner: 'Andy',
            title:'App crashes on refresh'
        },
        {
            priority: 'P1',
            status: 'New',
            owner: 'John',
            title: 'Misaligned border on panel'
        }
]);
