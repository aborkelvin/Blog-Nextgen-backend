import { model, Schema, Document } from "mongoose";

interface IBlog extends Document{
  title: string,
  description: string,
  image?: string, 
  author: Schema.Types.ObjectId,
  comments: Schema.Types.ObjectId[],
  ratings: Schema.Types.ObjectId[],
  createdAt?: Date,
  updatedAt?: Date
}

const blogSchema = new Schema<IBlog>({
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = model<IBlog>("Blog", blogSchema);

export { Blog }


