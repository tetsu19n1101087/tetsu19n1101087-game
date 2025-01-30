'use server';

import { z } from 'zod';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

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

  await axios
    .post('http://localhost:3001/results', {
      time,
      correctTypingNumber,
      average,
      missTypingNumber,
      accuracy,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  revalidateTag('results');
  redirect('/result');
}
