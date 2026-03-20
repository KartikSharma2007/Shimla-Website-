// Components/Blog/RelatedBlogCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedBlogCard.css';

const RelatedBlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <article className="related-blog-card" onClick={handleClick}>
      <div className="related-blog-image-wrapper">
        <img src={blog.image} alt={blog.title} className="related-blog-image" />
        <span className="related-blog-category">{blog.category}</span>
      </div>
      <div className="related-blog-content">
        <h3 className="related-blog-title">{blog.title}</h3>
        <div className="related-blog-meta">
          <span className="related-blog-date">{blog.date}</span>
          <span className="related-blog-read-time">{blog.readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default RelatedBlogCard;