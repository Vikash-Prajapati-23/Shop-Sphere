import express from 'express';
import { handleCreateSignup, handleCreateLogin, verifySessionLogin, verifySessionLogout, fetchUserDetails } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', handleCreateSignup);
router.post('/login', handleCreateLogin);
router.get('/verify-session-user', verifySessionLogin);
router.get('/logout', verifySessionLogout);
router.get('/me', fetchUserDetails);

export default router;