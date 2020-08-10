'use strict'

var chatbot = require('../models/ChatbotCategories'); // Importa el modelo con mongoose

const nodemailer = require('nodemailer');
var ejs = require('ejs');

var controller_chatbot = 
{
	// Save New Category
	saveCategory: (req, res) =>
	{
		var project = new chatbot();
		var params = req.body;

		// Group Data Info

		project.category_name = params.category_name;
		project.icon = params.icon;
		project.questions = params.questions;
		project.frequent = params.frequent;

		project.save((error,CategoryStored) => 
		{
			if(error) return res.status(500).send({message: "Error Al Guardar"});
			if(!CategoryStored) return res.status(404).send({message:'No Se Ha Podido Guardar Al Docente'})
			return res.status(200).send({Category:CategoryStored});
		});
	},

	getCategories: (req, res) =>
	{
		chatbot.find({/*[EJ: year:2019]*/}).exec((error,categories) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(categories.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({categories});
		});
	},

	updateProject: (req, res) =>
	{
		var projectID = req.params.id;
		var update = req.body;
		chatbot.findByIdAndUpdate(projectID, update, {new:true} ,(error, projectUpdated) =>
		{
			if(error) return res.status(500).send({message: 'Error Al Actualizar'});
			if(!projectUpdated) return res.status(404).send({message: 'No Existe El Proyecto'});
			return res.status(200).send({update: projectUpdated});
		});
	},

	deleteCategory: (req, res) =>
	{
		var projectID = req.params.id;
		chatbot.findByIdAndDelete(projectID, (error, projectDeleted) =>
		{
			if(error) return res.status(500).send({message: 'No Se Ha Podido Borrar El Proyecto'});
			if(!projectDeleted) return res.status(404).send({message: 'No Se Puede Eliminar Ese Proyecto'});
			return res.status(200).send({project: projectDeleted});
		});
	},

	sendEmail: (req, res) =>
	{
		var params = req.body;
		var transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: true,
		auth: 
		{
			// THIS ACCOUNT WILL SEND THE EMAIL
			user: 'example@gmail.com', // Change for your Email
			pass: 'example' // Change for your Password Email
			}
		});

		ejs.renderFile('./views/Email.ejs', { params }, function (err, data) 
		{
			if (err) 
			{
				console.log(err);
			} 
			else 
			{
				const mailOptions = 
				{
					from: 'DRChatBot <${params.email}>',
					// THIS ACCOUNT WILL RECIVE THE EMAIL
					to: 'example@hotmail.com', // Change for recipient email
					subject: 'Mensaje de la Pagina Web',
					html: data
				};
				transporter.sendMail(mailOptions, (err, info) =>
				{
					if(err) return res.status(200).send({message:err});
					else return res.status(200).send({message:'Correo Enviado'});
				});
			}
		});
	}
}

module.exports = controller_chatbot;