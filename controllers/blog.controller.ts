import { Blog } from "../models/blog.model";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./generic.controller";

const getAllBlogPosts = getAll(Blog);
const createBlogPost = createOne(Blog, "Blog Post");
const getBlogPost = getOne(Blog, "Blog Post");
const updateBlogPost = updateOne(Blog, "Blog Post");
const deleteBlogPost = deleteOne(Blog, "Blog Post");


export {
    getAllBlogPosts,
    createBlogPost,
    getBlogPost,
    updateBlogPost,
    deleteBlogPost
}