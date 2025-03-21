import mongoose from 'mongoose';
import { DB_URI } from '@/config';

const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    time: Number,
    correctTypingNumber: Number,
    average: Number,
    missTypingNumber: Number,
    accuracy: Number,
  },
  { timestamps: true }
);

export const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);

export async function connectDatabase() {
  await mongoose.connect(DB_URI).catch((err) => {
    console.log(err);
  });
}