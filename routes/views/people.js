// var keystone = require('keystone');
// exports = module.exports = function(req, res) {
// 	var view = new keystone.View(req, res);
// 	var locals = res.locals;
//
//
//
// 	//set locals
// 	locals.section = 'people';
//
// 	//load people
// 	view.query('people', keystone.list('Person').model.find());
// 	view.render('people');
// }


var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'people';
	locals.data = {
		people: [],
	};
	// Load the people
	view.on('init', function (next) {

		var q = keystone.list('Person').paginate({
			page: req.query.page || 1,
			perPage: 20,
			maxPages: 10,
		})
			.sort('generation')

		q.exec(function (err, results) {
			if(err) {
				console.log('Error is: ' + err);
				return;
			}
			locals.data.people = results;
			next(err);
		});
	});
	// Render the view
	view.render('people');
};
