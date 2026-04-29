import { z } from 'zod';

export const artworkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  price: z.number().nonnegative('Price must be 0 or higher'),
});
export const artworkUpdateSchema = z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().optional(),
    imageUrl: z.string().url('Invalid image URL').optional(),
    price: z.number().nonnegative('Price must be 0 or higher').optional(),
  });
  export const artistProfileSchema = z.object({
    bio: z.string().min(1, 'Bio is required'),
    website: z.string().url('Invalid website URL').optional(),
  });