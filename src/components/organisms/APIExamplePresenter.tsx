import React from 'react';
import { motion } from 'framer-motion';
import { Loader, AlertCircle, CheckCircle } from 'lucide-react';
import type { Post } from '@/services/types';

interface APIExamplePresenterProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  selectedPost: Post | null;
  onFetchAllPosts: () => void;
  onFetchUserPosts: (userId: number) => void;
  onSelectPost: (post: Post) => void;
  onDeselectPost: () => void;
}

/**
 * APIExamplePresenter - Pure UI Component
 * Displays API posts with filtering and detail view
 */
export const APIExamplePresenter: React.FC<APIExamplePresenterProps> = ({
  posts,
  loading,
  error,
  selectedPost,
  onFetchAllPosts,
  onFetchUserPosts,
  onSelectPost,
  onDeselectPost
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-saffron-50 to-slate-50 py-12 px-4">
      {/* Header */}
      <motion.div className="max-w-4xl mx-auto mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">API Integration Example</h1>
        <p className="text-lg text-gray-700">Real-time data fetching with axios service layer. Using JSONPlaceholder API.</p>
      </motion.div>

      {/* Control Buttons */}
      <motion.div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-3 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <button onClick={onFetchAllPosts} disabled={loading} className="px-6 py-2 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 disabled:opacity-50 transition">
          All Posts
        </button>
        <button onClick={() => onFetchUserPosts(1)} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
          User 1 Posts
        </button>
        <button onClick={() => onFetchUserPosts(2)} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
          User 2 Posts
        </button>
        <button onClick={() => onFetchUserPosts(3)} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
          User 3 Posts
        </button>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts List */}
        <div className="lg:col-span-2">
          {loading && (
            <motion.div className="flex flex-col items-center justify-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Loader className="animate-spin text-saffron-500 mb-4" size={32} />
              <p className="text-gray-600">Loading posts...</p>
            </motion.div>
          )}

          {error && (
            <motion.div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AlertCircle className="text-red-500 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-red-900">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {!loading && !error && posts.length > 0 && (
            <motion.div className="space-y-4" layout>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-lg p-5 cursor-pointer hover:shadow-lg transition border-l-4 border-saffron-500"
                  onClick={() => onSelectPost(post)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.body}</p>
                  <div className="mt-3 text-xs text-gray-500">
                    User ID: <span className="font-mono">{post.userId}</span> • Post ID: <span className="font-mono">{post.id}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && !error && posts.length === 0 && (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-500">No posts found</p>
            </motion.div>
          )}
        </div>

        {/* Post Detail */}
        <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          {selectedPost ? (
            <div className="bg-white rounded-lg p-6 sticky top-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-green-500" size={20} />
                <h2 className="font-bold text-gray-900">Post Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">Title</label>
                  <p className="text-gray-900 text-sm mt-1">{selectedPost.title}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">Content</label>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-6">{selectedPost.body}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-saffron-50 rounded p-3">
                    <label className="text-xs font-semibold text-saffron-900">User ID</label>
                    <p className="text-lg font-mono text-saffron-600 mt-1">{selectedPost.userId}</p>
                  </div>
                  <div className="bg-blue-50 rounded p-3">
                    <label className="text-xs font-semibold text-blue-900">Post ID</label>
                    <p className="text-lg font-mono text-blue-600 mt-1">{selectedPost.id}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Service Used:</h3>
                  <code className="bg-gray-100 p-2 rounded text-xs text-gray-800 block break-all">PostsService.getPostById({selectedPost.id})</code>
                </div>

                <button
                  onClick={onDeselectPost}
                  className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 sticky top-4 text-center text-gray-500">
              <p className="text-sm">Click on any post to view details</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Info Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="font-semibold text-blue-900 mb-3">📚 How This Works:</h3>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>✅ Uses <code className="bg-blue-100 px-2 py-1 rounded">PostsService</code> for API calls</li>
          <li>✅ Demonstrates error handling and loading states</li>
          <li>✅ Shows how to filter data by user ID</li>
          <li>✅ Uses JSONPlaceholder for demo data</li>
        </ul>
      </motion.div>
    </div>
  );
};
