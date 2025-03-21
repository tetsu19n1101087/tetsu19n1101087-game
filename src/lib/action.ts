'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Result, connectDatabase } from './mongo';

const ResultSchema = z.object({
  time: z.coerce.number(),
  correctTypingNumber: z.number(),
  average: z.number(),
  missTypingNumber: z.coerce.number(),
  accuracy: z.number(),
});

const CreateResult = ResultSchema.pick({ time: true, missTypingNumber: true });

export async function createResult(formData: FormData) {
  const { time, missTypingNumber } = CreateResult.parse({
    time: formData.get('time'),
    missTypingNumber: formData.get('miss'),
  });

  const correctTypingNumber = 10;
  const average = (10 + missTypingNumber) / time;
  const accuracy = (10 / (10 + missTypingNumber)) * 100;

  try {
    await connectDatabase();

    await Result.create({
      time,
      correctTypingNumber,
      average,
      missTypingNumber,
      accuracy,
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/result');
  redirect('/result');
}
