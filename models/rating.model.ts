import { model, Schema, Document } from 'mongoose';

interface IRating extends Document {
    rating: number,
    user: Schema.Types.ObjectId,
    blog: Schema.Types.ObjectId
}

const ratingSchema = new Schema<IRating>({
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
},
{ timestamps: true }
);
const Rating = model<IRating>("Rating", ratingSchema);

export { Rating }