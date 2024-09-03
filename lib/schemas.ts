import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  image: z.string().url().optional(),
});

export const ExpenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1).max(255),
  paidBy: z.number().int().positive(),
  groupId: z.number().int().positive(),
});

// Add more schemas for other entities