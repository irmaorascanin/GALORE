import { Router } from 'express';
import { addArtwork, listArtworks } from '../controllers/artwork.controller';
import { authenticate } from '../middleware/auth.middleware';
import { getArtworkById } from '../controllers/artwork.controller';
import { updateArtworkById } from '../controllers/artwork.controller';
import { deleteArtworkById } from '../controllers/artwork.controller';
import { createArtistProfile } from '../controllers/artwork.controller';

const router = Router();

router.post('/', authenticate, addArtwork);
router.get('/', listArtworks);
router.get('/:id', getArtworkById);
router.put('/:id', authenticate, updateArtworkById);
router.delete('/:id', authenticate, deleteArtworkById);
router.post('/artist', authenticate, createArtistProfile);


export default router;