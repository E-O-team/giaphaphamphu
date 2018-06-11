var keystone = require('keystone');
var Types = keystone.Field.Types;



var Person = new keystone.List('Person', {
    map: { name: 'fullName' },
	autokey: { path: 'slug', from: 'fullName', unique: true },

});

Person.add({
    fullName: { type: String, initial:true, required: true,label: 'Họ và tên', index:true,  },
    birth: {type: String, label: 'Ngày sinh'},
    death: {type: String, label: 'Ngày mất'},
    marriageStatus: {type: String, label: 'Tình Trạng Hôn Nhân' },
    father: {type: Types.Relationship, ref:'Person', label: 'Cha'},
    information: { type: Types.Html, wysiwyg: true, height: 150 },
	image: {type: Types.CloudinaryImage, label: 'Ảnh'},
    generation: {type: Types.Number, label: 'Đời'},
    cmnd: {type: Types.Number, label: 'Chứng Minh Nhân Dân'},
    sex: { type: Types.Select, options: 'nam,nữ' },
    phoneNumber: {type: Types.Number, label: 'Số điện thoại'},

});

Person.register();
