import express from "express";
import cors from "cors";
import dbConexion from "../database/config.js";

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
  async dbConexion(){
   await dbConexion();
    
  }
  middleware() {
    this.app.use(express.json());
    this.app.use(cors()); 
    this.app.use(express.static('public'));
  }
  routes() {

  }
 
  

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export {Server}