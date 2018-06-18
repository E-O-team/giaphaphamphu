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

        // var q = keystone.list('Person').paginate({
        //     filters: {
        //         generation: locals.filters.q
        //     },
        // })
        // q.exec(function (err, results) {
        //     if(err) {
        //         console.log('Error is: ' + err);
        //         return;
        //     }
        //     console.log(results);
        //     locals.data.people = results;
        //     next(err);
        // });

        keystone.list('Person').model.find().where('generation', locals.filters.q).exec(function(err, results){
            if(err){
                console.log('Error is: ' + err);
                return;
            }
            // console.log(results);
            locals.data=results;
            console.log(locals.data);
            next(err);
        })


    });

    // Render the view
    view.render('generation');
};
