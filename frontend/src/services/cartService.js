const API_BASE_URL = "http://localhost:3000/api/cart";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Generate or get user ID from localStorage (for guest users)
export const getUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    // Fixed: Use substring instead of deprecated substr
    userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("userId", userId);
  }
  return userId;
};

// Helper function to build headers
const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Helper function to add userId to URL or body
const addUserIdParam = (url) => {
  const token = getToken();
  if (!token) {
    const userId = getUserId();
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}userId=${userId}`;
  }
  return url;
};

// Get cart from backend
export const getCart = async () => {
  const headers = getHeaders();
  let url = addUserIdParam(API_BASE_URL);

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch cart");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  }
};

// Add item to cart
export const addToCart = async (product, quantity = 1) => {
  const headers = getHeaders();
  const body = {
    product,
    quantity,
  };

  // For guest users, include userId in body
  if (!getToken()) {
    body.userId = getUserId();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add item to cart");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  const headers = getHeaders();
  let url = `${API_BASE_URL}/update`;

  // Option 1: If your server supports query parameters for PUT requests
  if (!getToken()) {
    url += `?userId=${getUserId()}`;
  }

  const body = {
    productId,
    quantity,
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update cart item");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const headers = getHeaders();

  // For DELETE requests, it's better to use query parameters instead of body
  let url = `${API_BASE_URL}/remove/${productId}`;

  if (!getToken()) {
    url += `?userId=${getUserId()}`;
  }

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to remove item from cart");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  }
};

// Clear entire cart
export const clearCart = async () => {
  const headers = getHeaders();
  let url = addUserIdParam(`${API_BASE_URL}/clear`);

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to clear cart");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  }
};
