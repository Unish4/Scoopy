const API_BASE_URL = 'http://localhost:3000/api/payment';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Generate or get user ID from localStorage (for guest users)
export const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Get current user from localStorage
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Initiate eSewa payment
export const initiatePayment = async (totalAmount) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const currentUser = getCurrentUser();
  const userId = currentUser?._id || getUserId();

  const body = {
    userId,
    totalAmount
  };

  const response = await fetch(`${API_BASE_URL}/initiate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to initiate payment');
  }
  
  const data = await response.json();
  return data.data;
};

// Verify payment
export const verifyPayment = async (transactionUuid, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const body = {
    transaction_uuid: transactionUuid,
    status
  };

  const response = await fetch(`${API_BASE_URL}/verify`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to verify payment');
  }
  
  const data = await response.json();
  return data.data;
};

// Get order by ID
export const getOrder = async (orderId) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/order/${orderId}`, {
    method: 'GET',
    headers
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch order');
  }
  
  const data = await response.json();
  return data.data;
};
