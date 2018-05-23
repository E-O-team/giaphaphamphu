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
    information: { type: Types.Html, wysiwyg: true, height: 150 },
	image: {type: Types.CloudinaryImage, label: 'Ảnh'},
    generation: {type: Number, label: 'Đời'},
    cmnd: {type: Number, label: 'Chứng Minh Nhân Dân'},
    sex: {type: String, label: 'Giới tính', options: 'nam, nữ', default: 'nam'},
});

Person.register();
