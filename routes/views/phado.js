var keystone = require('keystone');

exports= module.exports= function(req,res){
    var view= new keystone.View(req, res);
    var locals= res.locals;

    //Set initLocals
    locals.section='phado';

    // Load People
    view.query('phado',keystone.list('Person').model.find());

    //Render view
    view.render('people');
}
