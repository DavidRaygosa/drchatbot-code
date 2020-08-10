'use strict'

var express = require('express');

// Controllers

var ChatbotController = require('../controllers/controller_chatbot');

var router = express.Router();

// MiddleWare

var multipart = require('connect-multiparty');
var multipartMiddleWare = multipart({uploadDir: './uploads'});

// Routes

	// ChatBot
		router.post('/new-chatbot-category', ChatbotController.saveCategory);
		router.get('/get-chatbot-categories', ChatbotController.getCategories);
		router.put('/update-chatbot-questions/:id', ChatbotController.updateProject);
		router.delete('/delete-chatbot-category/:id',ChatbotController.deleteCategory);
		router.post('/send-email-chatbot', ChatbotController.sendEmail);

module.exports = router;