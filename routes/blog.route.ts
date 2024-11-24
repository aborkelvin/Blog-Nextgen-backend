import express from "express";
import { createBlogPost, getAllBlogPosts, getBlogPost, updateBlogPost, deleteBlogPost } from "../controllers/blog.controller";
import { restrictTo, verifyAuthenticationToken } from "../middlewares/auth";

const blogRouter = express.Router();

blogRouter.route("/").get(getAllBlogPosts).post(verifyAuthenticationToken, restrictTo(["admin", "author"]), createBlogPost);


blogRouter.route("/:id").get(getBlogPost).patch(restrictTo(["admin", "author"]) ,updateBlogPost).delete(restrictTo(["admin", "author"]),deleteBlogPost);


export {
    blogRouter
}