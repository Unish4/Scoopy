import { useState, useEffect } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch stats");

      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admin/users?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.data.users);
      setPagination(data.data.pagination);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarts = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admin/carts?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch carts");

      const data = await response.json();
      setCarts(data.data.carts);
      setPagination(data.data.pagination);
    } catch (error) {
      console.error("Error fetching carts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboardStats();
    } else if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "carts") {
      fetchCarts();
    }
  }, [activeTab]);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#4A3828] mb-4">
            Access Denied
          </h1>
          <p className="text-[#6B5A4A] mb-8">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#B8956A] text-white rounded-lg hover:bg-[#A07F52] transition-all duration-300"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif text-3xl text-[#4A3828] mb-8">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-[#E8D9C5]">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "dashboard"
                    ? "border-[#B8956A] text-[#B8956A]"
                    : "border-transparent text-[#6B5A4A] hover:text-[#4A3828]"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-[#B8956A] text-[#B8956A]"
                    : "border-transparent text-[#6B5A4A] hover:text-[#4A3828]"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("carts")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "carts"
                    ? "border-[#B8956A] text-[#B8956A]"
                    : "border-transparent text-[#6B5A4A] hover:text-[#4A3828]"
                }`}
              >
                Carts
              </button>
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && stats && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B5A4A]">Total Users</p>
                    <p className="text-2xl font-bold text-[#4A3828]">
                      {stats.users.total}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-[#B8956A]" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B5A4A]">Active Users</p>
                    <p className="text-2xl font-bold text-[#4A3828]">
                      {stats.users.active}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B5A4A]">Total Revenue</p>
                    <p className="text-2xl font-bold text-[#4A3828]">
                      ${stats.carts.totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B5A4A]">Total Items</p>
                    <p className="text-2xl font-bold text-[#4A3828]">
                      {stats.carts.totalItems}
                    </p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-[#B8956A]" />
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-serif text-xl text-[#4A3828] mb-4">
                Recent Users
              </h2>
              <div className="space-y-3">
                {stats.users.recent.map((recentUser) => (
                  <div
                    key={recentUser._id}
                    className="flex items-center justify-between py-2 border-b border-[#E8D9C5] last:border-0"
                  >
                    <div>
                      <p className="font-medium text-[#4A3828]">
                        {recentUser.name}
                      </p>
                      <p className="text-sm text-[#6B5A4A]">
                        {recentUser.email}
                      </p>
                    </div>
                    <p className="text-sm text-[#6B5A4A]">
                      {new Date(recentUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-[#E8D9C5]">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-[#4A3828]">Users</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#6B5A4A]" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 border border-[#E8D9C5] rounded-lg text-[#4A3828] placeholder-[#6B5A4A] focus:outline-none focus:ring-2 focus:ring-[#B8956A]"
                      onChange={(e) => fetchUsers(1, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E8D9C5]">
                <thead className="bg-[#FAF8F5]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E8D9C5]">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-[#6B5A4A]"
                      >
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-[#6B5A4A]"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((userItem) => (
                      <tr key={userItem._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-[#4A3828]">
                              {userItem.name}
                            </p>
                            <p className="text-sm text-[#6B5A4A]">
                              {userItem.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              userItem.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {userItem.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              userItem.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {userItem.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B5A4A]">
                          {new Date(userItem.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="text-[#B8956A] hover:text-[#A07F52]">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Carts Tab */}
        {activeTab === "carts" && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-[#E8D9C5]">
              <h2 className="font-serif text-xl text-[#4A3828]">
                Shopping Carts
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E8D9C5]">
                <thead className="bg-[#FAF8F5]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B5A4A] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E8D9C5]">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-[#6B5A4A]"
                      >
                        Loading carts...
                      </td>
                    </tr>
                  ) : carts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-[#6B5A4A]"
                      >
                        No carts found
                      </td>
                    </tr>
                  ) : (
                    carts.map((cart) => (
                      <tr key={cart._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-[#4A3828]">
                              {cart.userId?.name || "Guest User"}
                            </p>
                            <p className="text-sm text-[#6B5A4A]">
                              {cart.userId?.email || "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B5A4A]">
                          {cart.items.length} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A3828]">
                          ${cart.subtotal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B5A4A]">
                          {new Date(cart.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-[#B8956A] hover:text-[#A07F52]">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
