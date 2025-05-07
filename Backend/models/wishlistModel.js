import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export const wishlist = mongoose.model('wishlist', wishlistSchema);