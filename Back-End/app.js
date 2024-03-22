// configuracione de l sistema en el archivo  :D
require("dotenv").config();
const Server = require("./models/server");
const server = new Server();

server.listen();

