import React, { useState, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { deleteComment, getComments, publishComment, togglePostLike } from './forumApi';
import { Comment, Post } from './forumTypes';
import './postDetails.css';

const PostDetails: React.FC = () => {
  const location = useLocation();
  const { post, username } = (location.state || {}) as { post?: Post; username?: string };
  const activeUsername = username || 'guest';
  const [liked, setLikeState] = useState(post?.liked_by ? post.liked_by.includes(activeUsername) : false);
  const [totalLikes, updateTotalLikes] = useState(post?.total_likes || 0);
  const [totalComments, updateTotalComments] = useState(post?.total_comments || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const getAllComments = async (title: string) => {
      const data = await getComments(title);
      setComments(data);
      updateTotalComments(data.length);
    };

    if (post?.title) {
      getAllComments(post.title);
    }
  }, [post?.title]);

  useEffect(() => {
    setLikeState(post?.liked_by ? post.liked_by.includes(activeUsername) : false);
    updateTotalLikes(post?.total_likes || 0);
    updateTotalComments(post?.total_comments || 0);
  }, [activeUsername, post]);

  if (!post) {
    return <div>No post found</div>;
  }

  const handleLike = async (title: string) => {
    try {
      const updatedPost = await togglePostLike(title, activeUsername, liked);
      setLikeState(updatedPost.liked_by.includes(activeUsername));
      updateTotalLikes(updatedPost.total_likes);
    } catch (error) {
      console.error('Error during like post:', error);
    }
  };

  const handleComment = async (content: string, originalPost: string) => {
    if (content.trim() === '') {
      alert("Comment cannot be blank");
      return;
    }
    try {
      const updatedComments = await publishComment(content, activeUsername, originalPost);
      setComments(updatedComments);
      updateTotalComments(updatedComments.length);
      setComment('');
    } catch (error) {
      console.error('Error during comment post:', error);
    }
  };

  const handleDeleteComment = async (id: number, originalPost: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete this comment?`);

    if (!confirmed) {
      return;
    }
      try {
        const updatedComments = await deleteComment(id, activeUsername, originalPost);
        setComments(updatedComments);
        updateTotalComments(updatedComments.length);
      } catch (error) {
        console.error('Error during deletion:', error);
      }
  };

  const formattedDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  return (
    <div>

    <div className='post-details'>
      <div className='post-info-details'>
        <h5 className='post-category-details'> {post.category} </h5>
        <h3 className='post-title-details'> {post.title}</h3>
        <h4 className='post-content-details'>{post.content}</h4>
        <h6 className='post-owner-date-details'>Posted by {post.owner} . {post.formatted_date || formattedDate(post.created_at)}</h6>
      </div>
      
    </div>
    <div className='post-reaction-details'>
        <Button
          startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={() => handleLike(post.title)}
        >
          {totalLikes}
        </Button>
        <Button startIcon={<ChatBubbleOutlineIcon />}>{totalComments}</Button>
    </div>
    <div className='post-comments'>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Type your comment here' />
      <Button className='post-comment-button' onClick={() => handleComment(comment, post.title)} >Post</Button>
      <h4>Comments:</h4>
      <ul className='comments-list'>
          {comments.map((comment: Comment) => (
            
            <li key={comment.id}>
              <p><b>{comment.owner}</b> &#183; {formattedDate(comment.created_at)}</p>
              <p>{comment.content}</p>
              {(comment.owner === activeUsername || activeUsername === post.owner) && (
                <Tooltip title="Delete comment">
                  <Button className='delete-comment-button' onClick={() => handleDeleteComment(comment.id, post.title)}>
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              )}
            </li>
          ))}
      </ul>
    </div>
    </div>
  );
};

export default PostDetails;
