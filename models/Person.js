var keystone = require('keystone');
var Types = keystone.Field.Types;



var Person = new keystone.List('Person', {
    map: { name: 'fullName' },
	autokey: { path: 'slug', from: 'fullName', unique: true },

});

Person.add({
    fullName: { type: String, initial:true, required: true,label: 'Họ và tên', index:true,  },
    birth: {type: Date, label: 'Ngày sinh'},
    father: {type: Types.Relationship, ref:'Person', label: 'Cha'},
    // gender: {type: String, Label:'Giới Tính'},
	image: {type: Types.CloudinaryImage, label: 'Ảnh'},
    generation: {type: Number, label: 'Đời'},
});

Person.register();
