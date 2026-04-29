import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createArtwork = async (data: {
  title: string;
  description?: string;
  imageUrl: string;
  price: number;
  artistId: string;
}) => {
  return await prisma.artwork.create({ data });
};

export const getAllArtworks = async () => {
  return await prisma.artwork.findMany();
};
export const updateArtwork = async (id: string, data: {
    title?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
  }) => {
    return await prisma.artwork.update({
      where: { id },
      data,
    });
  };
  export const deleteArtwork = async (id: string) => {
    return await prisma.artwork.delete({
      where: { id },
    });
  };