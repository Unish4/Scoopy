import express from 'express';
import {
  initiatePayment,
  verifyPayment,
  getOrder
} from '../controllers/paymentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply optional auth to all routes - works for both authenticated and guest users
router.use(optionalAuth);

// Initiate payment
router.post('/initiate', initiatePayment);

// Verify payment
router.post('/verify', verifyPayment);

// Get order by ID
router.get('/order/:orderId', getOrder);

export default router;
