import { model, Schema, Document } from 'mongoose';

interface IComment extends Document {
    comment: string,
    user: Schema.Types.ObjectId,
    blog: Schema.Types.ObjectId
}

const commentSchema = new Schema<IComment>({
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Blog is required"],
    },
  },
  { timestamps: true }
);
const Comment = model<IComment>("Comment", commentSchema);


export { Comment }