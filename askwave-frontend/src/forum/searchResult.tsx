import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useLocation, useNavigate } from 'react-router-dom';
import { togglePostLike } from './forumApi';
import { Post } from './forumTypes';
import './posts.css';

interface SearchResultProps {
    searchResults: Post[];
  }
  
const SearchResult: React.FC<SearchResultProps> = ({ searchResults }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};
  const activeUsername = username || 'guest';
  const [posts, setPosts] = useState<Post[]>(searchResults);
  const [likedStates, setLikedStates] = useState<boolean[]>(
    searchResults.map((post: Post) => (post.liked_by ? post.liked_by.includes(activeUsername) : false))
  );

  useEffect(() => {
    setPosts(searchResults);
    setLikedStates(
      searchResults.map((post: Post) => (post.liked_by ? post.liked_by.includes(activeUsername) : false))
    );
  }, [activeUsername, searchResults]);

  const handleLike = async (postId: number, title: string) => {
    try {
      const updatedPost = await togglePostLike(title, activeUsername, likedStates[postId]);

      setPosts((prevPosts) =>
        prevPosts.map((post, index) => (index === postId ? updatedPost : post))
      );

      setLikedStates((prev) => {
        const newState = [...prev];
        newState[postId] = !prev[postId];
        return newState;
      });
    } catch (error) {
      console.error('Error during like post:', error);
    }
  };
  
  const showPostView = (post: Post, username: string) => {
    navigate('/post-details', { state: { post, username } });
  };
  

  return (
    <div>
      {posts.map((post: Post, index: number) => {
        post.formatted_date = new Date(post.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        return (
          <div key={post.id} className='post'>
            <div className='post-info' onClick={() => showPostView(post, activeUsername)}>
              <h5 className='post-category'> {post.category} </h5>
              <h3 className='post-title'> {post.title}</h3>
              <h4 className='post-content'>{post.content}</h4>
              <h6 className='post-owner-date'>Posted by {post.owner} &#183; {post.formatted_date}</h6>
              
              </div>
              <Button className='post-reaction-button'
                startIcon={likedStates[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={() => handleLike(index, post.title)}
              >
                {post.total_likes}
              </Button>
              <Button className='post-reaction-button'
              startIcon={<ChatBubbleOutlineIcon />} 
              onClick={() => showPostView(post, activeUsername)}>
              {post.total_comments}
              </Button>
          </div>
        );
      })}
    </div>
    
  );
};

export default SearchResult;
