import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {        
    name?: string,
    username: string,
    age?: number,
    role: string,
    password: string,
    email?: string,
    createdAt?: Date;
    updatedAt?: Date;
    _doc?: any,
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,        
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    age: {
        type: Number,        
    },
    role: {
        type: String,
        enum: ["admin", "author", "user"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    email: {
        type: String,        
        unique: true,
    }
},
{
timestamps: true,
}
)

const User = model<IUser>('User', userSchema);

export { User }