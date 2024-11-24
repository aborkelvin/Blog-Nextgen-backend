import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, signIn, updateUser } from "../controllers/user.controller";
import { hashPassword } from "../middlewares/hashPassword";
import { createAuthenticationToken, sameUser, verifyAuthenticationToken } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(hashPassword,createUser);

userRouter
  .route("/:id")
  .get(getUser)
  .patch(verifyAuthenticationToken, sameUser, updateUser)
  .delete(deleteUser);

userRouter.route("/signin").post(signIn);

export { userRouter };
