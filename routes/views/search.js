var keystone = require('keystone');
var async = require('async');

var getPerson=function (person, callback) {
    keystone.list('Person').model.find().where('father', person.id).exec(function(err, person) {
        callback(person);
    })
}

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = req.params.q;
    locals.filters = {
        q: req.params.q,
    };
    locals.data = {
        people: [],
        q: req.params.q,
    };

    // Load people
    view.on('init', function(next) {
        var q = keystone.list('Person').model.findOne({
            slug: locals.filters.person
        });
        q.exec(function(err, person) {
            locals.data.person = person;
            getPerson(person);


            // console.log(person);
            next(err);
        });
    });
    // Render the view
    view.render('search');
};
