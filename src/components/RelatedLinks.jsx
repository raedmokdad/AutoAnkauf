import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedLinks.css';

function RelatedLinks({ title, links }) {
  if (!links || links.length === 0) return null;

  return (
    <aside className="related-links">
      <h3 className="related-links-title">{title}</h3>
      <ul className="related-links-list">
        {links.map((link, index) => (
          <li key={index} className="related-link-item">
            <Link to={link.path} className="related-link">
              <span className="related-link-icon">→</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default RelatedLinks;

