import { Rating } from "../models/rating.model";
import { getAll, getOne, updateOne, deleteOne, createOne, createOneAndUpdateBlog } from "./generic.controller";



const updateRating = updateOne(Rating, "Rating");
const getAllRatings = getAll(Rating);
const getRating = getOne(Rating, "Rating");
const deleteRating = deleteOne(Rating, "Rating");
const createRating = createOneAndUpdateBlog(Rating, "Rating");

export { updateRating, getAllRatings, getRating, deleteRating, createRating };