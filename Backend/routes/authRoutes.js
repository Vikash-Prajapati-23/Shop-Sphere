import express from 'express';
import { handleCreateSignup, handleCreateLogin, verifySessionLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', handleCreateSignup);
router.post('/login', handleCreateLogin);
router.get('/verify-session-user', verifySessionLogin);

export default router;