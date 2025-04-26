import mongoose from 'mongoose';
import { DB_URI } from '@/config';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ResultSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    time: Number,
    correctTypingNumber: Number,
    average: Number,
    missTypingNumber: Number,
    accuracy: Number,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Result =
  mongoose.models.Result || mongoose.model('Result', ResultSchema);

export async function connectDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(DB_URI).catch((err) => {
      console.log(err);
    });
  }
}
