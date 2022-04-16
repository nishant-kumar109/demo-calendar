import express, { Request, Response } from "express";
import { appendFile } from "fs";
import {PostController} from './controller/post.controller';
import{ createConnection, Connection } from 'typeorm';


class Server {
  private app : express.Application;
  private postController : PostController;

  constructor(){
    this.app  = express();  // init the application
    this.postController = new PostController(); // create a new instance of controller
    this.configuration();
    this.routes();
  }


  // method to configure the server
  public async configuration(){
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5434,
      username: "postgres",
      password: "**************",
      database: "postgres",
      entities: ["build/database/entities/**/*.js"],
      synchronize: true,
      name: "demo-calander"
    });
    this.app.set('port', process.env.PORT || 3000);
  }

  


  // method to configure the routes
  public async routes(){
    this.app.use('/api/post', this.postController.router);
    this.app.get('/', (req : Request, res : Response)=>{
      res.status(200).json({success : true, data : {'name' : 'nishant'}, message : 'we are here to work'})
    })
  }

  // used the start server
  public start(){
    this.app.listen(this.app.get('port'), ()=>{
      console.log(`Server is listening ${this.app.get('port')}, port`)
    })
  }

}

const server = new Server();
server.start();