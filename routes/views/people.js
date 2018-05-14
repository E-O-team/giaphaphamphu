var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// // keystone.list('Person').model.find().where('fullName', input).exec(function(err, children){})
	// keystone.list('Person').model.find(function(err, results) {
	// 	// Do your action here..
	// 	locals.data.fullName = results;
	// 	if (results == '') {
	// 		locals.data.invalid = 'Invalid search';
	// 	}
	// 	next(err);
    //     console.log(results);
	// });

	//set locals
	locals.section = 'people';

	//load people
	view.query('people', keystone.list('Person').model.find());
	view.render('people');
}
