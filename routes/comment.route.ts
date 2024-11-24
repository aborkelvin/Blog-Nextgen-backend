import express from "express";
import { createComment, deleteComment, getAllComments, getComment, getCommentsByBlog, updateComment } from "../controllers/comment.controller";

const commentRouter = express.Router();


commentRouter.route("/").get(getAllComments).post( createComment);
commentRouter.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);
commentRouter.route("/blogs/:blogId").get(getCommentsByBlog);


export { commentRouter }


