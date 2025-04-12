import express from 'express';
import { handleCreateSignup, handleCreateLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', handleCreateSignup);
router.post('/login', handleCreateLogin);

export default router;