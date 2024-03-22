//CONFIGURACION DEL SISTEMA E IMPORTACIONES NECESARIAS 
//AUTOR:JOSE ANTONIO GOVEA MILLAN
//DESCRIPCION:CONFIGURACION BASICA DE SERVIDOR CON NODE Y EXPRESS
const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
require('../database/configDatabase');
//ASIGNANDO LA CARPETA PUBLICA DE MANERA ESTATICA

class Server {
	constructor() {
		this.app = express();
		this.port = (process.env.PORT || 8081);
		this.usuariosPath = "/api/datos";
		this.middlewares();

		// Rutas de mi aplicacion
		this.routes();
	}

	middlewares() {
		//Cors
		this.app.use(cors());

		this.app.use(morgan('tiny'))
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
			res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
			next();
		});
		this.app.use(express.json())

		//ruta publica
		this.app.use(express.static("public"));
	}

	routes() {
		//path de la ruta
		this.app.use(this.usuariosPath, require("../routes/Routes"));
	}

	listen() {
		//Informacion de Puerto
		this.app.listen(this.port);
		console.log("Servidor corriendo en puerto " + this.port);
	}
}

module.exports = Server;
