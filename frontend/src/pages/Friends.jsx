import { useState, useEffect } from 'react';
import { FaUserPlus, FaUserMinus, FaSpinner, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Friends = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser, fetchCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      setFollowLoading(true);
      await userAPI.followUser(userId);
      await fetchCurrentUser();
      toast.success('Follow status updated');
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  };

  const isFollowing = (userId) => {
    return currentUser?.following?.includes(userId);
  };

  const filteredUsers = users.filter(user => 
    user._id !== currentUser?._id && // Don't show current user
    (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-[#16213e] rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Find Friends</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
          />
        </div>
        
        {/* Users List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-4xl text-[#e94560]" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No users found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <div key={user._id} className="flex items-center space-x-4 p-4 bg-[#1a1a2e] rounded-lg">
                <img
                  src={user.profileImage || 'https://via.placeholder.com/50?text=User'}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-white">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={() => handleFollow(user._id)}
                  disabled={followLoading}
                  className={`p-2 rounded-full ${
                    isFollowing(user._id)
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-[#e94560] text-white hover:bg-[#e94560]/90'
                  } transition-colors duration-200 disabled:opacity-50`}
                >
                  {followLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : isFollowing(user._id) ? (
                    <FaUserMinus />
                  ) : (
                    <FaUserPlus />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Following Section */}
      <div className="bg-[#16213e] rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">People You Follow</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-4xl text-[#e94560]" />
          </div>
        ) : !currentUser?.following || currentUser.following.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>You're not following anyone yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users
              .filter(user => currentUser.following.includes(user._id))
              .map((user) => (
                <div key={user._id} className="flex items-center space-x-4 p-4 bg-[#1a1a2e] rounded-lg">
                  <img
                    src={user.profileImage || 'https://via.placeholder.com/50?text=User'}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleFollow(user._id)}
                    disabled={followLoading}
                    className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {followLoading ? <FaSpinner className="animate-spin" /> : <FaUserMinus />}
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
