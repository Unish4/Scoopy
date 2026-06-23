import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Profile() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(profileData.name, profileData.email);
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }

    setLoading(true);

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <p className="text-[#6B5A4A] mb-4">Please log in to view your profile</p>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 bg-[#B8956A] text-white rounded-lg hover:bg-[#A07F52] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#B8956A] px-8 py-6">
            <h1 className="font-serif text-2xl text-white">My Account</h1>
            <p className="text-[#FAF8F5] mt-1">Welcome back, {user.name}!</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#E8D9C5]">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-[#B8956A] text-[#B8956A]'
                    : 'border-transparent text-[#6B5A4A] hover:text-[#4A3828]'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'password'
                    ? 'border-[#B8956A] text-[#B8956A]'
                    : 'border-transparent text-[#6B5A4A] hover:text-[#4A3828]'
                }`}
              >
                Change Password
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-[#4A3828] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-[#6B5A4A]" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="pl-10 block w-full border border-[#E8D9C5] rounded-lg px-3 py-2 text-[#4A3828] placeholder-[#6B5A4A] focus:outline-none focus:ring-2 focus:ring-[#B8956A] focus:border-[#B8956A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A3828] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-[#6B5A4A]" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="pl-10 block w-full border border-[#E8D9C5] rounded-lg px-3 py-2 text-[#4A3828] placeholder-[#6B5A4A] focus:outline-none focus:ring-2 focus:ring-[#B8956A] focus:border-[#B8956A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B5A4A]">
                      Account Status: <span className="font-medium text-green-600">Active</span>
                    </p>
                    <p className="text-sm text-[#6B5A4A]">
                      Member since: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={logout}
                      className="px-4 py-2 border border-[#E8D9C5] rounded-lg text-[#6B5A4A] hover:bg-[#F5F1EB] transition-all duration-300"
                    >
                      Logout
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-[#B8956A] text-white rounded-lg hover:bg-[#A07F52] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A3828] mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-[#6B5A4A]" />
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="pl-10 pr-10 block w-full border border-[#E8D9C5] rounded-lg px-3 py-2 text-[#4A3828] placeholder-[#6B5A4A] focus:outline-none focus:ring-2 focus:ring-[#B8956A] focus:border-[#B8956A]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-3 top-3"
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-5 w-5 text-[#6B5A4A]" />
                        ) : (
                          <Eye className="h-5 w-5 text-[#6B5A4A]" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A3828] mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-[#6B5A4A]" />
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        minLength={6}
                        className="pl-10 pr-10 block w-full border border-[#E8D9C5] rounded-lg px-3 py-2 text-[#4A3828] placeholder-[#6B5A4A] focus:outline-none focus:ring-2 focus:ring-[#B8956A] focus:border-[#B8956A]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-3"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-5 w-5 text-[#6B5A4A]" />
                        ) : (
                          <Eye className="h-5 w-5 text-[#6B5A4A]" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A3828] mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-[#6B5A4A]" />
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        minLength={6}
                        className="pl-10 pr-10 block w-full border border-[#E8D9C5] rounded-lg px-3 py-2 text-[#4A3828] placeholder-[#6B5A4A] focus:outline-none focus:ring-2 focus:ring-[#B8956A] focus:border-[#B8956A]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-3 top-3"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-5 w-5 text-[#6B5A4A]" />
                        ) : (
                          <Eye className="h-5 w-5 text-[#6B5A4A]" />
                        )}
                      </button>
                    </div>
                    {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || passwordData.newPassword !== passwordData.confirmPassword}
                    className="px-6 py-2 bg-[#B8956A] text-white rounded-lg hover:bg-[#A07F52] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
