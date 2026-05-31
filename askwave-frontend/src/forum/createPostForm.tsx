import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { createPost } from './forumApi';
import './createPostForm.css';

interface CreatePostFormProps {
  onClose: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose }) => {
  const location = useLocation();
  const { username } = location.state || {};
  const activeUsername = username || 'guest';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const categories = ['General', 'Resources', 'Academic', 'CCAs', 'Events', 'Well-being'];
  const [category, setCategory] = useState('General');

  const publishPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPost({
        title: title,
        content: content,
        owner: activeUsername,
        category: category,
      });
      onClose();
    } catch (error) {
      console.error('Error during publish:', error);
    }
  };

  return (
    <div className="createPostForm">
      
      <form onSubmit={publishPost}>
        <span className="close" onClick={onClose}>&times;</span>
        <h3 className='createPostTitle'>Create Post</h3>
        <label>Title:</label>
        <input className="postTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required/>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
          <button type='submit'>Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
