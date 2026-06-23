import asyncHandler from 'express-async-handler';
import { Cart } from '../models/Cart.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private/Public (supports both authenticated and guest users)
export const getCart = asyncHandler(async (req, res) => {
  let userId;

  // If user is authenticated, use their ID
  if (req.user) {
    userId = req.user._id;
  } else {
    // For guest users, use userId from query or generate one
    userId = req.query.userId;
    if (!userId) {
      res.status(400);
      throw new Error('User ID required for guest users');
    }
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: []
    });
  }

  res.status(200).json({
    success: true,
    data: {
      userId: cart.userId,
      items: cart.items,
      subtotal: cart.subtotal,
      totalItems: cart.totalItems,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt
    }
  });
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private/Public (supports both authenticated and guest users)
export const addToCart = asyncHandler(async (req, res) => {
  const { product, quantity, userId } = req.body;

  if (!product || !quantity || quantity <= 0) {
    res.status(400);
    throw new Error('Please provide valid product and quantity');
  }

  let cartUserId;

  // If user is authenticated, use their ID
  if (req.user) {
    cartUserId = req.user._id;
  } else {
    // For guest users, require userId from request body
    if (!userId) {
      res.status(400);
      throw new Error('User ID required for guest users');
    }
    cartUserId = userId;
  }

  let cart = await Cart.findOne({ userId: cartUserId });

  if (!cart) {
    cart = await Cart.create({
      userId: cartUserId,
      items: []
    });
  }

  const existingItemIndex = cart.items.findIndex(
    item => item.productId === product.id
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity
    });
  }

  await cart.save();

  res.status(201).json({
    success: true,
    message: 'Item added to cart successfully',
    data: {
      userId: cart.userId,
      items: cart.items,
      subtotal: cart.subtotal,
      totalItems: cart.totalItems,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt
    }
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private/Public (supports both authenticated and guest users)
export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity, userId } = req.body;

  if (!productId || quantity === undefined) {
    res.status(400);
    throw new Error('Please provide valid productId and quantity');
  }

  let cartUserId;

  // If user is authenticated, use their ID
  if (req.user) {
    cartUserId = req.user._id;
  } else {
    // For guest users, require userId from request body
    if (!userId) {
      res.status(400);
      throw new Error('User ID required for guest users');
    }
    cartUserId = userId;
  }

  let cart = await Cart.findOne({ userId: cartUserId });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    item => item.productId === productId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    data: {
      userId: cart.userId,
      items: cart.items,
      subtotal: cart.subtotal,
      totalItems: cart.totalItems,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt
    }
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private/Public (supports both authenticated and guest users)
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, userId } = req.body;

  if (!productId) {
    res.status(400);
    throw new Error('Please provide valid productId');
  }

  let cartUserId;

  // If user is authenticated, use their ID
  if (req.user) {
    cartUserId = req.user._id;
  } else {
    // For guest users, require userId from request body
    if (!userId) {
      res.status(400);
      throw new Error('User ID required for guest users');
    }
    cartUserId = userId;
  }

  let cart = await Cart.findOne({ userId: cartUserId });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    item => item.productId === productId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Item removed from cart successfully',
    data: {
      userId: cart.userId,
      items: cart.items,
      subtotal: cart.subtotal,
      totalItems: cart.totalItems,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt
    }
  });
});

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private/Public (supports both authenticated and guest users)
export const clearCart = asyncHandler(async (req, res) => {
  let cartUserId;

  // If user is authenticated, use their ID
  if (req.user) {
    cartUserId = req.user._id;
  } else {
    // For guest users, require userId from query
    const { userId } = req.query;
    if (!userId) {
      res.status(400);
      throw new Error('User ID required for guest users');
    }
    cartUserId = userId;
  }

  let cart = await Cart.findOne({ userId: cartUserId });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
    data: {
      userId: cart.userId,
      items: cart.items,
      subtotal: 0,
      totalItems: 0,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt
    }
  });
});
