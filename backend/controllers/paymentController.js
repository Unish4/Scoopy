import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';

// Helper function to generate HMAC SHA256 hash
function generateHmacSha256Hash(data, secret) {
  if (!data || !secret) {
    throw new Error('Both data and secret are required to generate a hash.');
  }
  const hash = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64');
  return hash;
}

// Helper function to generate unique transaction UUID
function generateTransactionUuid() {
  return `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// @desc    Initiate eSewa payment
// @route   POST /api/payment/initiate
// @access  Private/Public
export const initiatePayment = asyncHandler(async (req, res) => {
  const { userId, totalAmount } = req.body;

  if (!userId || !totalAmount) {
    res.status(400);
    throw new Error('User ID and total amount are required');
  }

  // Get user's cart
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  // Calculate shipping
  const subtotal = cart.subtotal;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  // Verify total amount matches
  if (Math.abs(total - totalAmount) > 0.01) {
    res.status(400);
    throw new Error('Total amount mismatch');
  }

  // Generate transaction UUID
  const transactionUuid = generateTransactionUuid();

  // eSewa configuration
  const esewaConfig = {
    merchantId: process.env.ESEWA_MERCHANT_ID || 'EPAYTEST',
    secret: process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q',
    successUrl: process.env.FRONTEND_URL 
      ? `${process.env.FRONTEND_URL}/payment-success` 
      : 'http://localhost:5173/payment-success',
    failureUrl: process.env.FRONTEND_URL 
      ? `${process.env.FRONTEND_URL}/payment-failure` 
      : 'http://localhost:5173/payment-failure',
    esewaPaymentUrl: process.env.ESEWA_PAYMENT_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
  };

  // Prepare payment data
  const paymentData = {
    amount: totalAmount.toFixed(2),
    failure_url: esewaConfig.failureUrl,
    product_delivery_charge: '0',
    product_service_charge: '0',
    product_code: esewaConfig.merchantId,
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    success_url: esewaConfig.successUrl,
    tax_amount: '0',
    total_amount: totalAmount.toFixed(2),
    transaction_uuid: transactionUuid
  };

  // Generate signature
  const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
  const signature = generateHmacSha256Hash(data, esewaConfig.secret);
  paymentData.signature = signature;

  // Create order with pending status
  const order = await Order.create({
    userId,
    items: cart.items,
    subtotal,
    shipping,
    total,
    paymentMethod: 'esewa',
    paymentStatus: 'pending',
    transactionUuid,
    status: 'processing'
  });

  // Return the payment data for the frontend to submit the form
  res.status(200).json({
    success: true,
    data: {
      orderId: order._id,
      transactionUuid,
      paymentUrl: esewaConfig.esewaPaymentUrl,
      paymentData
    }
  });
});

// @desc    Verify eSewa payment
// @route   POST /api/payment/verify
// @access  Private/Public
export const verifyPayment = asyncHandler(async (req, res) => {
  const { transaction_uuid, status } = req.body;

  if (!transaction_uuid) {
    res.status(400);
    throw new Error('Transaction UUID is required');
  }

  // Find the order
  const order = await Order.findOne({ transactionUuid: transaction_uuid });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Update order based on payment status
  if (status === 'completed' || status === 'success') {
    order.paymentStatus = 'completed';
    order.status = 'confirmed';
    
    // Clear the user's cart
    await Cart.findOneAndUpdate(
      { userId: order.userId },
      { items: [] }
    );
  } else {
    order.paymentStatus = 'failed';
    order.status = 'cancelled';
  }

  await order.save();

  res.status(200).json({
    success: true,
    data: {
      orderId: order._id,
      paymentStatus: order.paymentStatus,
      status: order.status
    }
  });
});

// @desc    Get order by ID
// @route   GET /api/payment/order/:orderId
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check if user owns the order
  if (order.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to access this order');
  }

  res.status(200).json({
    success: true,
    data: order
  });
});
