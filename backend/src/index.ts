import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import artworkRoutes from './routes/artwork.routes';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
