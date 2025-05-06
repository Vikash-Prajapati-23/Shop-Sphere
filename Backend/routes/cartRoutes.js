import express from 'express';
import { handleAddToCart, handleGetCart, handleRemoveFromCart } from '../controllers/cartController.jsx';
import { verifySessionLogin } from '../controllers/authController.js';