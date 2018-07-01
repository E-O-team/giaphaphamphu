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

	var getChildren=function (person, callback) {
		keystone.list('Person').model.find().where('father', person.id).exec(function(err, children) {
			callback(children);
		})
	}
	//OG
    function getFamilyTree(person){
        getChildren(person, function(children){
            person.children=children;
            for (var i=0;i<person.children.length;i++) {
				!function outer(i){
					if (isNotEmpty(person.children[i])){
						getChildren(person.children[i],function(children){
								person.children[i].children=children;
								for (var j=0;j<person.children[i].children.length;j++){
									!function outer(j){
										if (isNotEmpty(person.children[i].children[j])){
											getChildren(person.children[i].children[j],function(children){
													person.children[i].children[j].children=children;
													for (var k=0;k<person.children[i].children[j].children.length;k++){
														!function outer(k){
															if (isNotEmpty(person.children[i].children[j].children[k])){
																getChildren(person.children[i].children[j].children[k],function(children){
																	person.children[i].children[j].children[k].children=children;
																	// console.log(person.children[i].children[j].children[k].children);
																})
															}
														}(k);
													}
											})
										}

									}(j);
								}
		                });
					}

				}(i);
            }
        })
    }

	//Stack's
	// function getFamilyTree ( person ) {
	// 	if (isNotEmpty(person)){
	// 		getChildren( person, function( children ) {
	// 	        person.children = children;
	// 	        for ( var i = 0; i < person.children.length;i++ ) {
	// 				if (isNotEmpty(person.children[i])){
	// 					getFamilyTree( person.children[ i ] );
	// 				}
	// 	        }
	// 	    })
	// 	}
	// }

function isNotEmpty(obj) {
	for(var key in obj) {
	    if(obj.hasOwnProperty(key))
	        return true;
	}
	return false;
}
	view.on('init', function(next) {
		var q = keystone.list('Person').model.findOne({
			slug: locals.filters.person,
		}).populate('father');
		q.exec(function(err, person) {
			if(err) {
                console.log('Error is: ' + err);
                return;
            }
			locals.data.person = person;
            getFamilyTree(person);


			// console.log(person);
			next(err);
		});
	});
	//load people
	view.render('person');
}
