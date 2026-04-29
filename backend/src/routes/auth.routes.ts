import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();


router.get('/ping', (req, res) => {
  console.log('PING route hit');
  res.send('pong');
});

router.post('/login', login);
router.post('/register', register);

export default router;
