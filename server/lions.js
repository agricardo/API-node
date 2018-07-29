var lionRouter = require('express').Router();

var lions = [{
    'id': '1',
    'name': 'Simba',
    'pride': 'The cool cats',
    'age': 3,
    'gender': 'male'
},
{
    'id': '2',
    'name': 'Mufasa',
    'pride': 'The cool cats',
    'age': 4,
    'gender': 'male'
}

];
var id = 2;


var updatedId = function(req, res, next){
    if(!req.body.id){
        req.body.id = id + '';
    }

    next();
}


lionRouter.get('/lions', (req, res) => {
    res.json(lions);
});

lionRouter.get('/lions/:id', (req, res) => {
  var lion = req.lion;
    res.json(lion || {});
});

lionRouter.post('/lions', updatedId, (req, res) => {
    var lion = req.body;

    lions.push(lion);
    res.json(lion);
    console.log(lion);
});



lionRouter.put('/lions/:id', (req, res) => {
    var update = req.body;
    if (update.id) {
        delete update.id;
    }

    var lion = lions.findIndex(lion => lion.id == req.params.id);
    if (!lions[lion]) {
        res.send();
    } else {
        var updatedLion = Object.assign(lions[lion], update);
        res.json(updatedLion);
    }
})



lionRouter.delete('/lions/:id', (req, res) =>{
    var lion = lions.findIndex(lion => lion.id == req.params.id);
    if(!lions[lion]){
        res.send();
    }else{
        var deletedLion = lions[lion];
        lions.splice(lion, 1);
        res.json(deletedLion);
    }
});

lionRouter.param('id', (req, res, next, id) =>{
    var lion = lion.find(lion =>{
        return lion.id == id;
    });

    if (lion) {
        req.lion = lion;
        next();
    }else{
        res.send()
    }
})

module.exports = lionRouter;//fix later