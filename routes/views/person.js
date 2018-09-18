var keystone = require('keystone');
var async = require('async');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    //set locals
    locals.section = 'people';
    locals.filters = {
        person: req.params.person
    }
    locals.data = {
        people: []
    }

    function notEmpty(person){
        if (typeof person !== 'undefined' && person.length > 0) {
            return true
        }else{
            return false
        }
    }

    async function getFamilyTree(person){
        await keystone.list('Person').model.find().where('father', person.id).exec()
        .then(children => {
            if (notEmpty(children)){
                person.children = children;
                let childrenGen2 = children;
                return childrenGen2
            }
        })
        .then(childrenGen2 => {
            if (notEmpty(childrenGen2)){
                childrenGen2.forEach(async (person) => {
                    await keystone.list('Person').model.find().where('father', person.id).exec()
                    .then(children => {
                        if (notEmpty(children)){
                            person.children = children;
                            let childrenGen3 = children;
                            return childrenGen3
                        }
                    })
                    .then(childrenGen3 => {
                        if(notEmpty(childrenGen3)){
                            childrenGen3.forEach(async (person) => {
                                await keystone.list('Person').model.find().where('father', person.id).exec()
                                .then(children => {
                                    if (notEmpty(children)){
                                        person.children = children;
                                        let childrenGen4 = children;
                                        return childrenGen4
                                    }
                                })
                                .then(childrenGen4 => {
                                    if(notEmpty(childrenGen4)){
                                        childrenGen4.forEach(async (person) => {
                                            await keystone.list('Person').model.find().where('father', person.id).exec()
                                            .then(children => {
                                                if (notEmpty(children)){
                                                    // console.log(children);
                                                    person.children = children;
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    }


    view.on('init', function(next) {
        var q = keystone.list('Person').model.findOne({slug: locals.filters.person}).populate('father');
        q.exec(function(err, person) {
            if (err) {
                console.log('Error is: ' + err);
                return;
            }
            locals.data.person = person;

            getFamilyTree(person)
            next(err);
        });
    });
    //load people
    view.render('person');
}
