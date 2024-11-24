import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
import { blogRouter } from "./routes/blog.route";
import { commentRouter } from "./routes/comment.route";
import { userRouter } from "./routes/user.route";
import { ratingRouter } from "./routes/rating.route";
require("dotenv").config();



const app: Express = express();

//Middleware
app.use(express.json());
app.use("/blogs", blogRouter)
app.use("/comments", commentRouter)
app.use("/users", userRouter);
app.use("/ratings", ratingRouter);


//Connect to DB
mongoose.connect(process.env.MONGO_DB as string)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});


//Routes
app.get("/", (req:Request, res:Response) => {
    res.send("Hello World");    
})


//Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})


