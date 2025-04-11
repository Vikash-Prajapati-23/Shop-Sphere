const express = require('express');
const { handleCreateSignup, handleCreateLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', handleCreateSignup);
router.post('/login', handleCreateLogin);


module.exports = router;