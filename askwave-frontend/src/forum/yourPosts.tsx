import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditPostForm from './editPostForm';
import { useLocation } from 'react-router-dom';
import { getPosts, removePost } from './forumApi';
import { Post } from './forumTypes';
import './yourPosts.css';

function YourPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const location = useLocation();
  const { username } = location.state || {};
  const activeUsername = username || 'guest';

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();

  const openForm = (post: Post) => {
      setIsFormVisible(true);
      setSelectedPost(post);
  };

  const closeForm = () => {
      setIsFormVisible(false);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await getPosts({ owner: activeUsername });
      setPosts(data);
    };

    getAllPosts();
  }, [activeUsername]);

  const handleDeletePost = async (title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the post "${title}"?`);

    if (!confirmed) {
      return;
    }
      try {
        await removePost(title, activeUsername);
        setPosts((prevPosts) => prevPosts.filter((post) => post.title !== title));
      } catch (error) {
        console.error('Error during deletion:', error);
      }
  };
  
  return (
    <div>
      {posts.map((post: Post) => {
        const formattedDate = new Date(post.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        return (
  
          <div key={post.id} className='your-post'>
            <div className='your-post-custom'>
            <Tooltip title="Edit post"> 
              <Button className='edit-button' onClick={() => openForm(post)}><EditIcon/></Button>
            </Tooltip>
            <Tooltip title="Delete post">
              <Button className='delete-button' onClick={() => handleDeletePost(post.title)}><DeleteIcon/></Button>
            </Tooltip>
            </div>

            <div className='post-info'>
              <h5 className='post-category'> {post.category} </h5>
              <h3 className='post-title'> {post.title}</h3>
              <h4 className='post-content'>{post.content}</h4>
              <h6 className='post-owner-date'>Posted by {post.owner} &#183; {formattedDate}</h6>
              <div className='your-post-reaction'>
                <FavoriteBorderIcon/>{post.total_likes}
                <ChatBubbleOutlineIcon />{post.total_comments}
              </div>
            </div>
          </div>
        );
      })}

    <Modal
        className='createPostForm'
        open={isFormVisible}
        onClose={closeForm}
    >
        <div className="modal-content">
            <EditPostForm onClose={closeForm} post={selectedPost} originalTitle={selectedPost?.title}/>
        </div>
    </Modal>
    </div>
  );
}

export default YourPosts;
