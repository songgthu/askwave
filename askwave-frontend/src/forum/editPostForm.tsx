import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePost } from './forumApi';
import { Post } from './forumTypes';
import './createPostForm.css';

interface CreatePostFormProps {
    onClose: () => void; 
    post?: Post;
    originalTitle?: string;
}
  
  const EditPostForm: React.FC<CreatePostFormProps> = ({ onClose, post, originalTitle }) => {
    const location = useLocation();
    const { username } = location.state || {};
    const activeUsername = username || 'guest';

    const [title, setTitle] = useState(post?.title ?? '');
    const [content, setContent] = useState(post?.content ?? '');

    const categories = ['General', 'Resources', 'Academic', 'CCAs', 'Events', 'Well-being'];
    const [category, setCategory] = useState(post?.category ?? '');

    const editPost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updatePost({
                title: title,
                content: content,
                owner: activeUsername,
                category: category,
                originalTitle: originalTitle,
            });
            onClose();
            } catch (error) {
            console.error('Error during publish:', error);
            }
    }

    return (
        <div className="editPostForm">
            <form onSubmit={editPost}>
                <span className="close" onClick={onClose}>&times;</span>    
                <h3 className='editPostTitle'>Edit Post</h3>
                <label>Title:</label>
                <input className="postTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type='submit'>Save changes</button>
            </form>
        </div>
      );
};

export default EditPostForm;
