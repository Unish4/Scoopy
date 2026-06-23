import asyncHandler from 'express-async-handler';
import { User } from '../models/User.js';
import { Cart } from '../models/Cart.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }
    : {};

  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, isActive } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent admin from deactivating themselves
  if (req.user._id.toString() === user._id.toString() && isActive === false) {
    res.status(400);
    throw new Error('You cannot deactivate your own account');
  }

  // Prevent admin from removing their own admin role
  if (req.user._id.toString() === user._id.toString() && role === 'user') {
    res.status(400);
    throw new Error('You cannot remove your own admin role');
  }

  if (name) user.name = name;
  if (email) {
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: user._id } });
    if (existingUser) {
      res.status(400);
      throw new Error('Email already exists');
    }
    user.email = email;
  }
  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent admin from deleting themselves
  if (req.user._id.toString() === user._id.toString()) {
    res.status(400);
    throw new Error('You cannot delete your own account');
  }

  // Delete user's cart
  await Cart.deleteMany({ userId: user._id.toString() });

  // Delete user
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const adminUsers = await User.countDocuments({ role: 'admin' });
  const recentUsers = await User.find()
    .select('name email createdAt')
    .sort({ createdAt: -1 })
    .limit(5);

  const carts = await Cart.find();
  const totalCarts = carts.length;
  const activeCarts = carts.filter(cart => cart.items.length > 0).length;
  const totalItems = carts.reduce((sum, cart) => sum + cart.totalItems, 0);
  const totalRevenue = carts.reduce((sum, cart) => sum + cart.subtotal, 0);

  res.status(200).json({
    success: true,
    data: {
      users: {
        total: totalUsers,
        active: activeUsers,
        admin: adminUsers,
        recent: recentUsers
      },
      carts: {
        total: totalCarts,
        active: activeCarts,
        totalItems,
        totalRevenue
      }
    }
  });
});

// @desc    Get all carts (admin view)
// @route   GET /api/admin/carts
// @access  Private/Admin
export const getAllCarts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const carts = await Cart.find()
    .populate('userId', 'name email')
    .sort({ updatedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Cart.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      carts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});
