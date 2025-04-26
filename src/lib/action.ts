'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Result, User, connectDatabase } from './mongo';
import { cookies } from 'next/headers';
import { createSession, getSession } from './session';

const ResultSchema = z.object({
  time: z.coerce.number(),
  correctTypingNumber: z.number(),
  average: z.number(),
  missTypingNumber: z.coerce.number(),
  accuracy: z.number(),
});

const CreateResult = ResultSchema.pick({ time: true, missTypingNumber: true });

const UserSchema = z.object({
  username: z.string().min(3).max(20),
});

export async function createResult(formData: FormData) {
  const { time, missTypingNumber } = CreateResult.parse({
    time: formData.get('time'),
    missTypingNumber: formData.get('miss'),
  });

  const correctTypingNumber = 10;
  const average = (10 + missTypingNumber) / time;
  const accuracy = (10 / (10 + missTypingNumber)) * 100;

  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  try {
    await connectDatabase();

    await Result.create({
      userId: session.userId,
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

export async function loginUser(formData: FormData) {
  const { username } = UserSchema.parse({
    username: formData.get('username'),
  });

  try {
    await connectDatabase();

    // Find user or create if doesn't exist
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username });
    }

    // Create session
    await createSession(user._id.toString(), username);

    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Failed to login' };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session');

  revalidatePath('/');
  redirect('/login');
}
