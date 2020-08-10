'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema(
{
	// Category Info

	category_name: String,
	icon: String,
	questions: 
	[{
		question: String,
    	answer: String
    }],
    frequent: String

});

module.exports = mongoose.model('chatbot', ProjectSchema);

// projects --> guarda los documentos en la coleccion	