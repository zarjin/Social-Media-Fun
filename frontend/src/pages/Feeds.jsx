import { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaImage, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { postAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Feeds() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', postImage: null });
  const [postLoading, setPostLoading] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const { currentUser } = useAuth();

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postAPI.getAllPosts();

        // Transform posts to include showComments property
        const transformedPosts = response.data.data.map((post) => ({
          ...post,
          showComments: false,
        }));

        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle comment submission
  const handleCommentSubmit = async (postId) => {
    if (newComment.trim() === '') return;

    try {
      setCommentLoading(true);
      await postAPI.commentOnPost(postId, { text: newComment });

      // Refresh posts after comment
      const response = await postAPI.getAllPosts();
      const updatedPosts = response.data.data.map((post) => ({
        ...post,
        showComments: post._id === postId ? true : false,
      }));

      setPosts(updatedPosts);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  // Handle like/unlike
  const handleLike = async (postId) => {
    try {
      setLikeLoading(true);
      await postAPI.likePost(postId);

      // Refresh posts after like
      const response = await postAPI.getAllPosts();
      const updatedPosts = response.data.data.map((post) => ({
        ...post,
        showComments:
          posts.find((p) => p._id === post._id)?.showComments || false,
      }));

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    } finally {
      setLikeLoading(false);
    }
  };

  // Toggle comments visibility
  const toggleComments = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  // Handle new post creation
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.postImage) {
      toast.error('Title and image are required');
      return;
    }

    try {
      setPostLoading(true);

      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('postImage', newPost.postImage);

      await postAPI.createPost(formData);

      // Refresh posts after creating new post
      const response = await postAPI.getAllPosts();
      const updatedPosts = response.data.data.map((post) => ({
        ...post,
        showComments: false,
      }));

      setPosts(updatedPosts);
      setNewPost({ title: '', postImage: null });
      setShowPostForm(false);
      toast.success('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setPostLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setNewPost({
      ...newPost,
      postImage: e.target.files[0],
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Create Post Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="bg-[#e94560] text-white px-6 py-2 rounded-full hover:bg-[#e94560]/90 transition-colors duration-200 flex items-center space-x-2"
        >
          <FaImage />
          <span>{showPostForm ? 'Cancel' : 'Create New Post'}</span>
        </button>
      </div>

      {/* Create Post Form */}
      {showPostForm && (
        <div className="bg-[#16213e] rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold text-[#e94560] mb-4">
            Create New Post
          </h2>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                placeholder="What's on your mind?"
              />
            </div>
            <div>
              <label
                htmlFor="postImage"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Image
              </label>
              <input
                type="file"
                id="postImage"
                onChange={handleFileChange}
                className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-300"
                accept="image/*"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={postLoading}
                className="bg-[#e94560] text-white px-4 py-2 rounded-md hover:bg-[#e94560]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {postLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <span>Post</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-4xl text-[#e94560]" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-300">
          <p className="text-xl">No posts yet. Be the first to post!</p>
        </div>
      ) : (
        // Posts List
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-[#16213e] rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="p-4 flex items-center space-x-4">
              <img
                src={
                  post.createPostBy?.profileImage ||
                  'https://via.placeholder.com/40'
                }
                alt={`${post.createPostBy?.firstName || 'User'}'s profile`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="font-semibold text-gray-200">
                  {post.createPostBy?.firstName} {post.createPostBy?.lastName}
                </span>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="px-4 pb-4">
              <p className="text-gray-200 mb-2">{post.title}</p>
              {post.postImage && (
                <img
                  src={post.postImage}
                  alt="Post"
                  className="w-full h-auto object-cover rounded-lg"
                  loading="lazy"
                />
              )}
            </div>
            <div className="px-4 py-2 border-t border-gray-700 flex justify-between text-gray-400 text-sm">
              <button
                onClick={() => handleLike(post._id)}
                disabled={likeLoading}
                className={`flex items-center space-x-2 hover:text-[#e94560] transition-colors duration-200 ${
                  post.likes.includes(currentUser?.id) ? 'text-[#e94560]' : ''
                }`}
              >
                <FaThumbsUp />
                <span>{post.likes.length} Likes</span>
              </button>
              <button
                onClick={() => toggleComments(post._id)}
                className="flex items-center space-x-2 hover:text-[#e94560] transition-colors duration-200"
              >
                <FaComment />
                <span>{post.comments.length} Comments</span>
              </button>
            </div>
            {post.showComments && (
              <div className="p-4 border-t border-gray-700">
                <ul className="space-y-2">
                  {post.comments.map((comment, index) => (
                    <li key={index} className="text-sm text-gray-300">
                      <span className="font-semibold">
                        {comment.user?.firstName || 'User'}:
                      </span>{' '}
                      {comment.text}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-grow p-2 bg-[#1a1a2e] border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#e94560] text-gray-200"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    disabled={commentLoading}
                    className="bg-[#e94560] text-white px-4 py-2 rounded-r-lg hover:bg-[#e94560]/90 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-colors duration-200 disabled:opacity-50"
                  >
                    {commentLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      'Post'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
