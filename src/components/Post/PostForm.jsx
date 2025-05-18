import { useState } from 'react';
import { createPost } from '../../services/api';
import './Post.css';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const newPost = await createPost({ 
        content,
        imageUrl: imageUrl.trim() || null,
        author: author.trim() || 'Anonymous'
      });
      onPostCreated(newPost);
      setContent('');
      setImageUrl('');
      setAuthor('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="post-form-notebook">
      <h2 className="form-title">
        <span className="underline">New Note</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Author</label>
          <input
            type="text"
            placeholder="Your name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="notebook-input"
          />
        </div>
        <div className="form-field">
          <label>Message</label>
          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="notebook-textarea"
          />
        </div>
        <div className="form-field">
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Paste image link..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="notebook-input"
          />
        </div>
        <button 
          type="submit" 
          className="notebook-button"
          disabled={!content.trim()}
        >
          Pin This Note
        </button>
      </form>
    </div>
  );
};

export default PostForm;