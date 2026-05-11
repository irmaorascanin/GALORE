"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistProfileSchema = exports.artworkUpdateSchema = exports.artworkSchema = void 0;
const zod_1 = require("zod");
exports.artworkSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().url().optional(),
    price: zod_1.z.number().nonnegative('Price must be 0 or higher'),
});
exports.artworkUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').optional(),
    description: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().url('Invalid image URL').optional(),
    price: zod_1.z.number().nonnegative('Price must be 0 or higher').optional(),
});
exports.artistProfileSchema = zod_1.z.object({
    bio: zod_1.z.string().min(1, 'Bio is required'),
    website: zod_1.z.string().url('Invalid website URL').optional(),
});
