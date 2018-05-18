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

	//testing
	// var getChildren=function (person, callback) {
	// 	keystone.list('Person').model.find().where('father', person.id).exec(function(err, children) {
	// 		callback(children);
	// 	})
	// }
	//
	// function getFamilyTree(i,person) {
	//   getChildren(person,function(children){
	// 	  person.children=children;
	// 	  if( i < person.children.length ) {
	// 	    getChildren(person.children, function(children){
	// 			person.children[i].children=children;
	// 			getFamilyTree(i+1,person);
	// 		});
	// 	  }
	//   });
	// }
	//testing


	//OG
	// var getChildren=function (person, callback) {
	// 	keystone.list('Person').model.find().where('father', person.id).exec(function(err, children) {
	// 		callback(children);
	// 	})
	// }

	//OG
    // function getFamilyTree(person){
    //     getChildren(person, function(children){
    //         person.children=children;
    //         for (var i=0;i<person.children.length;i++) {
	// 			!function outer(i){
	// 				if (isNotEmpty(person.children[i])){
	// 					getChildren(person.children[i],function(children){
	// 							person.children[i].children=children;
	// 							for (var j=0;j<person.children[i].children.length;j++){
	// 								!function outer(j){
	// 									if (isNotEmpty(person.children[i].children[j])){
	// 										getChildren(person.children[i].children[j],function(children){
	// 												person.children[i].children[j].children=children;
	// 												for (var k=0;k<person.children[i].children[j].children.length;k++){
	// 													!function outer(k){
	// 														if (isNotEmpty(person.children[i].children[j].children[k])){
	// 															getChildren(person.children[i].children[j].children[k],function(children){
	// 																person.children[i].children[j].children[k].children=children;
	//
	// 															})
	// 														}
	// 													}(k);
	// 												}
	// 										})
	// 									}
	//
	// 								}(j);
	// 							}
	// 	                });
	// 				}
	//
	// 			}(i);
    //         }
    //     })
    // }

	//stack's
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
	//
	// }

//stackOverFlow's
// 	function getChildren(person) {
// 		return new Promise((resolve, reject) => {
// 			keystone.list('Person').model.find().where('father', person.id).exec((err, children) => {
// 				if(err) reject(err);
// 				else resolve(children);
// 			});
// 		});
// 	}
//
// async function getFamilyTree(person, maxDepth, depth=0) {
// 	if(depth >= maxDepth) return person;
// 	const children = (await getChildren(person)).filter(isNotEmpty(person));
// 	person.children = await Promise.all(children.map(child => getFamilyTree(child, maxDepth, depth + 1)));
// 	return person;
// }


function outer(child) {
	if (isNotEmpty(child)) {
		getChildren(child, getChildrenCallback);
	}
}

function getChildrenCallback(children, parent) {
    parent.children = children;
    for ( var i = 0; i < children.length; i++) {
        outer(child[i]);
    }


function isNotEmpty(obj) {
	for(var key in obj) {
	    if(obj.hasOwnProperty(key))
	        return true;
	}
	return false;
}
	view.on('init', function(next) {
		var q = keystone.list('Person').model.findOne({
			slug: locals.filters.person
		});
		q.exec(function(err, person) {
			locals.data.person = person;
            getFamilyTree(person);

			// getFamilyTree({id: person.id}, 5)
			//   .then(tree => console.log(tree))
			//   .catch(error => console.log(error));


			// console.log(person);
			next(err);
		});
	});
	//load people
	view.render('person');
}
