import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner, FaEdit, FaUser, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser, fetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (currentUser) {
      reset({
        bio: currentUser.bio || '',
        workAt: currentUser.workAt || '',
        address: currentUser.address || '',
        relationshipStatus: currentUser.relationshipStatus || '',
      });
    }
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('bio', data.bio);
      formData.append('workAt', data.workAt);
      formData.append('address', data.address);
      formData.append('relationshipStatus', data.relationshipStatus);
      
      // Add images if selected
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }
      
      await userAPI.updateProfile(formData);
      await fetchCurrentUser();
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#e94560]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Cover Image */}
      <div className="relative h-64 rounded-t-lg overflow-hidden mb-16">
        <img
          src={currentUser.coverImage || 'https://via.placeholder.com/1200x400?text=Cover+Image'}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        
        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8 w-32 h-32 rounded-full border-4 border-[#16213e] overflow-hidden">
          <img
            src={currentUser.profileImage || 'https://via.placeholder.com/150?text=Profile'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Edit Button */}
        <button
          onClick={() => setEditMode(!editMode)}
          className="absolute top-4 right-4 bg-[#e94560] text-white p-2 rounded-full hover:bg-[#e94560]/90 transition-colors duration-200"
        >
          <FaEdit size={18} />
        </button>
      </div>
      
      {/* User Info */}
      <div className="bg-[#16213e] rounded-lg shadow-lg p-6 mt-8">
        <div className="ml-32 -mt-16">
          <h1 className="text-2xl font-bold text-white">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p className="text-gray-400">{currentUser.email}</p>
        </div>
        
        {editMode ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
                  accept="image/*"
                />
              </div>
              
              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Cover Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
                  accept="image/*"
                />
              </div>
              
              {/* Bio */}
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  {...register('bio', {
                    minLength: { value: 10, message: 'Bio must be at least 10 characters' },
                    maxLength: { value: 100, message: 'Bio must be at most 100 characters' }
                  })}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
                  placeholder="Tell us about yourself"
                ></textarea>
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
                )}
              </div>
              
              {/* Work */}
              <div>
                <label htmlFor="workAt" className="block text-sm font-medium text-gray-300 mb-1">
                  Work
                </label>
                <input
                  id="workAt"
                  type="text"
                  {...register('workAt')}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
                  placeholder="Where do you work?"
                />
              </div>
              
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register('address')}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
                  placeholder="Where do you live?"
                />
              </div>
              
              {/* Relationship Status */}
              <div>
                <label htmlFor="relationshipStatus" className="block text-sm font-medium text-gray-300 mb-1">
                  Relationship Status
                </label>
                <select
                  id="relationshipStatus"
                  {...register('relationshipStatus')}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
                >
                  <option value="">Select status</option>
                  <option value="Single">Single</option>
                  <option value="In a relationship">In a relationship</option>
                  <option value="Married">Married</option>
                  <option value="It's complicated">It's complicated</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#e94560] text-white px-4 py-2 rounded-md hover:bg-[#e94560]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-[#e94560] font-medium">Bio</h3>
                <p className="text-gray-300">{currentUser.bio || 'No bio added yet'}</p>
              </div>
              <div>
                <h3 className="text-[#e94560] font-medium">Work</h3>
                <p className="text-gray-300">{currentUser.workAt || 'Not specified'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-[#e94560] font-medium">Address</h3>
                <p className="text-gray-300">{currentUser.address || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-[#e94560] font-medium">Relationship Status</h3>
                <p className="text-gray-300">{currentUser.relationshipStatus || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-[#16213e] rounded-lg shadow-md p-4 flex items-center space-x-4">
          <div className="bg-[#e94560]/20 p-3 rounded-full">
            <FaImage className="text-[#e94560] text-xl" />
          </div>
          <div>
            <h3 className="text-gray-300 font-medium">Posts</h3>
            <p className="text-2xl font-bold text-white">{currentUser.yourPost?.length || 0}</p>
          </div>
        </div>
        <div className="bg-[#16213e] rounded-lg shadow-md p-4 flex items-center space-x-4">
          <div className="bg-[#e94560]/20 p-3 rounded-full">
            <FaUser className="text-[#e94560] text-xl" />
          </div>
          <div>
            <h3 className="text-gray-300 font-medium">Followers</h3>
            <p className="text-2xl font-bold text-white">{currentUser.followers?.length || 0}</p>
          </div>
        </div>
        <div className="bg-[#16213e] rounded-lg shadow-md p-4 flex items-center space-x-4">
          <div className="bg-[#e94560]/20 p-3 rounded-full">
            <FaUser className="text-[#e94560] text-xl" />
          </div>
          <div>
            <h3 className="text-gray-300 font-medium">Following</h3>
            <p className="text-2xl font-bold text-white">{currentUser.following?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
