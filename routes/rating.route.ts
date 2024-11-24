import express from "express";
import { createRating, deleteRating, getAllRatings, getRating, updateRating } from "../controllers/rating.controller";

const ratingRouter = express.Router();

ratingRouter
  .route("/")
  .get(getAllRatings)
  .post(createRating);
//ratingRouter.route("/blogs/:blogId").get(getAllRatingbyBlog);

ratingRouter
  .route("/:id")
  .get(getRating)
  .patch(updateRating)
  .delete(deleteRating);

export { ratingRouter };
