var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;


    // Init locals
    locals.section = 'req.params.q';
    locals.filters = {
        q: req.params.q,
    };
    locals.data = {
        people: [],
        q: req.params.q,
    };

    view.on('init', function (next) {

        var q = keystone.list('Person').paginate({
            filters: {
                slug: { $regex: locals.filters.q , $options: 'i'},
            },
        })
        q.exec(function (err, results) {
            locals.data.people = results;
            next(err);
        });

    });

    // view.on('init', function (next) {
    //   var q = keystone.list('Person').model.find().where('fullName', '$regex: locals.filters.q');
    //   q.exec(function (err, results) {
    //       console.log(results);
    //       locals.data.people = results;
    //       next(err);
    //   });
    //
    // });


    // Render the view
    view.render('search');
};
