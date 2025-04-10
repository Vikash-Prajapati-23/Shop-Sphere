const express = require('express');
const { handleCreateSignup } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', handleCreateSignup);


module.exports = router;