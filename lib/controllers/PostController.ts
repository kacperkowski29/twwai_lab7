import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import PostModel from "../models/PostModel";

class PostController implements Controller {
   public path = '/api/posts';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
    this.router.get(this.path, this.getPosts);
    this.router.get(`${this.path}/:title`, this.getPost);
    this.router.post(this.path, this.createPost);
   }

   private getPosts = async (request: Request, response: Response) => {
       try {
           const posts = await PostModel.find();
           response.json(posts);
       } catch (error) {
           console.error('Error while fetching posts:', error);
           response.status(500).json({ error: 'An error occurred while fetching posts' });
       }
   };

   private getPost = async (request: Request, response: Response) => {
       try {
           const post = await PostModel.findOne({ title: request.params.title });
           if (post) {
               response.json(post);
           } else {
               response.status(404).json({ error: 'Post not found' });
           }
       } catch (error) {
           console.error('Error while fetching post:', error);
           response.status(500).json({ error: 'An error occurred while fetching the post' });
       }
   };

   private createPost = async (request: Request, response: Response) => {
    const { title, text, image } = request.body;
 
    try {
        const newPost = new PostModel({ title, text, image });
        await newPost.save();
        response.status(201).json(newPost);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Error occurred' });
    }
 };
}

export default PostController;