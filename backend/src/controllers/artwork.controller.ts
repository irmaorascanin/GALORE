import { Request, Response } from 'express';
import { createArtwork, getAllArtworks, updateArtwork, deleteArtwork } from '../services/artwork.service';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/prismaClient';
import { artworkSchema, artworkUpdateSchema } from '../validators/artwork.validator';
import { artistProfileSchema } from '../validators/artwork.validator';

export const addArtwork = async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, price } = req.body;
    const parsed = artworkSchema.safeParse({ title, description, imageUrl, price });

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }

    const reqUser = req as AuthRequest;

    const userId = reqUser.user?.id;
    console.log('➡️  User ID from token:', userId);

    const artist = await prisma.artist.findUnique({ where: { userId } });
    console.log('➡️  Found artist:', artist);

    if (!artist) {
      return res.status(403).json({ error: 'No artist found for this user.' });
    }

    const artwork = await createArtwork({
      title,
      description,
      imageUrl,
      price,
      artistId: artist.id,
    });

    res.status(201).json(artwork);
  } catch (error) {
    console.error('❌ Error creating artwork:', error);
    res.status(400).json({ error: 'Failed to create artwork' });
  }
};

export const listArtworks = async (_req: Request, res: Response) => {
  try {
    const artworks = await getAllArtworks();
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
};
export const getArtworkById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const artwork = await prisma.artwork.findUnique({ where: { id } });
  
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
  
      res.status(200).json(artwork);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch artwork' });
    }
  };
  export const updateArtworkById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, imageUrl, price } = req.body;

    const parsed = artworkUpdateSchema.safeParse({ title, description, imageUrl, price });

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
  
    try {
      const updated = await updateArtwork(id, { title, description, imageUrl, price });
  
      if (!updated) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
  
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update artwork' });
    }
  };
  export const deleteArtworkById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const deleted = await deleteArtwork(id);
      res.status(200).json({ message: 'Artwork deleted', deleted });
    } catch (error) {
      console.error('❌ Error deleting artwork:', error);
      res.status(400).json({ error: 'Failed to delete artwork' });
    }
  };    
  export const createArtistProfile = async (req: Request, res: Response) => {
    
    const reqUser = req as AuthRequest;
    const userId = reqUser.user?.id;
    const { bio, website } = req.body;

    const parsed = artistProfileSchema.safeParse({ bio, website });

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
  
    try {
      const existing = await prisma.artist.findUnique({ where: { userId } });
      if (existing) {
        return res.status(400).json({ error: 'Artist profile already exists' });
      }
  
      const artist = await prisma.artist.create({
        data: {
          userId,
          bio,
          website,
        },
      });
  
      res.status(201).json(artist);
    } catch (error) {
      console.error('❌ Error creating artist profile:', error);
      res.status(400).json({ error: 'Failed to create artist profile' });
    }
  };