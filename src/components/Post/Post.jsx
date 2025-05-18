import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { updatePost, deletePost } from '../../services/api';
import './Post.css';

const Post = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedImageUrl, setEditedImageUrl] = useState(post.imageUrl);

  const handleUpdate = async () => {
    try {
      const updatedPost = await updatePost(post.id, { 
        content: editedContent,
        imageUrl: editedImageUrl
      });
      onUpdate(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Remove this note forever?')) {
      try {
        await deletePost(post.id);
        onDelete(post.id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-note">
      <div className="note-header">
        <div className="note-author">
          <span className="author-badge">{post.author.charAt(0)}</span>
          <span>{post.author}</span>
        </div>
        <time className="note-date">{formatDate(post.createdAt)}</time>
      </div>
      
      <div className="note-content">
        {isEditing ? (
          <div className="edit-mode">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              autoFocus
              className="edit-textarea"
            />
            <input
              type="text"
              value={editedImageUrl || ''}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              placeholder="Image URL"
              className="edit-input"
            />
            <div className="edit-actions">
              <button 
                className="note-action cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button 
                className="note-action save"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>{post.content}</p>
            {post.imageUrl && (
              <div className="note-image">
                <img src={post.imageUrl} alt="Post content" />
              </div>
            )}
          </>
        )}
      </div>
      
      {!isEditing && (
        <div className="note-footer">
          <button 
            className="note-action"
            onClick={() => setIsEditing(true)}
          >
            <FiEdit2 /> Edit
          </button>
          <button 
            className="note-action danger"
            onClick={handleDelete}
          >
            <FiTrash2 /> Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;