import React, { useEffect, useState, useCallback } from 'react';
import { APIExamplePresenter } from '@/components/organisms/APIExamplePresenter';
import { PostsService } from '@/services';
import type { Post } from '@/services/types';
import { useScroll } from '@/hooks/useScroll';

/**
 * APIExampleContainer - Smart Component
 * Manages API calls, loading states, errors, and post selection
 */
export const APIExampleContainer: React.FC = () => {
  useScroll();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    handleFetchAllPosts();
  }, []);

  const handleFetchAllPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PostsService.getAllPosts();
      setPosts(data.slice(0, 6)); // Show first 6 posts
      setSelectedPost(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(errorMessage);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFetchUserPosts = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await PostsService.getPostsByUserId(userId);
      setPosts(data.slice(0, 6));
      setSelectedPost(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(errorMessage);
      console.error('Error fetching user posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectPost = useCallback((post: Post) => {
    setSelectedPost(post);
  }, []);

  const handleDeselectPost = useCallback(() => {
    setSelectedPost(null);
  }, []);

  return (
    <APIExamplePresenter
      posts={posts}
      loading={loading}
      error={error}
      selectedPost={selectedPost}
      onFetchAllPosts={handleFetchAllPosts}
      onFetchUserPosts={handleFetchUserPosts}
      onSelectPost={handleSelectPost}
      onDeselectPost={handleDeselectPost}
    />
  );
};
