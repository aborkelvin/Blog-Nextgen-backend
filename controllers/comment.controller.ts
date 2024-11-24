import {Request, Response, NextFunction} from "express";

import { Comment } from "../models/comment.model";
import { createOne, createOneAndUpdateBlog, deleteOne, getAll, getOne, updateOne } from "./generic.controller";

const getAllComments = getAll(Comment);
const createComment = createOneAndUpdateBlog(Comment, "Comment");
const getComment = getOne(Comment, "Comment");
const updateComment = updateOne(Comment, "Comment");
const deleteComment = deleteOne(Comment, "Comment");
const getCommentsByBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId });
        if (!comments) {
            res.status(404).json({
                status: "failure",
                message: "No comments found for this blog",
            });
            return;
        }
        res.json({
            status: "success",
            message: "Comments retrieved successfully",
            data: comments,
        });
    } catch (err: any) {
        res.status(500).json({
            status: "failure",
            message: err.message ? err.message : "Internal Server error",
        });
    }
};

export {
    getAllComments,
    createComment,
    getComment,
    updateComment,
    deleteComment,
    getCommentsByBlog
}