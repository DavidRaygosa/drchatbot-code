'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
app.set('port', process.env.PORT || port)

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
		.then
		(
			() =>
				{
					console.log("Conexion a la base de datos establecida satisfactoriamente...");
					app.listen(app.get('port'), () => 
					{
 						console.log("Servidor Corriendo Correctamente En Puerto: "+app.get('port'));
					});
				}
		)

		.catch(error => console.log(error));