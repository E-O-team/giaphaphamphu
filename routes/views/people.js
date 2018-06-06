var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	//set locals
	locals.section = 'person';
	locals.data={
		people:[]
	}

	// load people
	// view.query('people', keystone.list('Person')).paginate({
	// 	page: req.query.page || 1,
	// 	perPage: 10,
	// 	maxPages: 10,
	// });


	// view.on('init', function (next) {
	//
	// 	var q = keystone.list('Person').paginate({
	// 		page: req.query.page || 1,
	// 		perPage: 10,
	// 		maxPages: 10,
	// 	})
	// 	q.exec(function (err, results) {
	// 		locals.data.posts = results;
	// 		next(err);
	// 	});
	// });

	view.on('init', function (next) {

		var q = keystone.list('Person').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,

		})

		q.exec(function (err, results) {
			locals.data.people = results;
			next(err);
		});
	});

	view.render('people');
}
