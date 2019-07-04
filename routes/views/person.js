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

    function notEmpty(children){
        if (typeof children !== 'undefined' && children.length > 0) {
            return true
        }else{
            return false
        }
    }

    async function getFamilyTree(person, next){
        await keystone.list('Person').model.find().where('father', person.id).exec()
        .then(children => {
            if (notEmpty(children)){
                person.children = children;
                let childrenGen2 = children;
                return childrenGen2
            }else{
                // next()
            }
        })
        .then(childrenGen2 => {
            if (notEmpty(childrenGen2)){
                childrenGen2.forEach(async (person, index, array) => {
                    var last2 = false
                    if (index === array.length - 1){
                        last2 = true
                    }
                    await keystone.list('Person').model.find().where('father', person.id).exec()
                    .then(children => {
                        if (notEmpty(children)){
                            person.children = children;
                            let childrenGen3 = children;
                            return {childrenGen3, last2}
                        }else{
                            if(last2){
                                // next()
                            }
                        }
                    })
                    .then(({childrenGen3, last2}) => {
                        if(notEmpty(childrenGen3)){
                            childrenGen3.forEach(async (person, index, array) => {
                                var last3 = false
                                if (index === array.length - 1){
                                    last3 = true
                                }
                                await keystone.list('Person').model.find().where('father', person.id).exec()
                                .then(children => {
                                    if (notEmpty(children)){
                                        person.children = children;
                                        let childrenGen4 = children;
                                        return {childrenGen4, last2, last3}
                                    }else{
                                        if(last3 == true && last2 == true){
                                            console.log("done");
                                            // next()
                                        }
                                    }
                                })
                                .then(({childrenGen4, last2, last3}) => {
                                    if(notEmpty(childrenGen4)){
                                        childrenGen4.forEach(async (person, index, array) => {
                                            var last4 = false
                                            if (index === array.length - 1){
                                                last4 = true
                                            }
                                            await keystone.list('Person').model.find().where('father', person.id).exec()
                                            .then(children => {
                                                if (notEmpty(children)){
                                                    person.children = children;

                                                }else{
                                                    if(last4 == true && last3 == true && last2 == true){
                                                        // next()
                                                    }
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
                return next(err);
            }
            locals.data.person = person;
            // console.log(person);
            getFamilyTree(person, next)
            setTimeout(() => next(), 1800)
            // setTimeout((next) => { next() }, 3000);
        });
    });
    //load people
    view.render('person');
}
