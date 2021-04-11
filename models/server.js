import express from "express";
import cors from "cors"
import dbConexion from "../database/config.js"
import categoria from "../routes/categoria.js"
import usuario from "../routes/usuario.js"

class Server {
  constructor() {
    //puerto
    this.port = process.env.PORT;
    // crear servidor
    this.app = express();
    // conectar a la base de datos
    this.dbConexion();
    // reconozca todos los middlewares
    this.middleware();
    // conocer a node todas las routes- rutas
    this.routes();
  }
  
    
  
 
  // aqui vamos a colocar las rutas
  routes() {
    this.app.use('/api/categoria',categoria);
    this.app.use('/api/usuario',usuario); 
  }
// Conexión a la base de datos
  async dbConexion(){
    await dbConexion();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors()); 
    this.app.use(express.static('public'));
  }
 
  
// desde qui va a escuchar nuestro servidor 
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export {Server}