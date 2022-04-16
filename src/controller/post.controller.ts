import { Router, Response, Request } from "express";
import { PostService } from "../service/post.service";
import { PostEntity } from "../database/entities/post.entity";




export class PostController {
  public router : Router;
  private postService : PostService;

  constructor(){
    this.router = Router();
    this.postService = new PostService();
    this.routes();
  }
  

  public index = async (req : Request, res : Response)=>{
    res.send(this.postService.index());
  }

  public create = async (req : Request, res : Response)=>{
    const post = req['body'] as PostEntity;
    const newPost = await this.postService.create(post);
    res.send(newPost);
  }

  public update = async (req : Request, res : Response)=>{
    const post = req['body'] as PostEntity;
    const id =  req['params']['id'];
    res.send(this.postService.update(post, Number(id)));
  }

  public delete = async (req : Request, res : Response)=>{
    const id =  req['params']['id'];
    res.send(this.postService.delete(Number(id)));
  }

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }

}