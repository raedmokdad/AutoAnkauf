import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import Breadcrumbs from './Breadcrumbs';
import RelatedLinks from './RelatedLinks';
import './ContentPage.css';

function ContentPage({
  title,
  subtitle,
  seoTitle,
  seoDescription,
  seoKeywords,
  breadcrumbs,
  content,
  relatedLinks,
  faqs,
  ctaTitle = "Jetzt Ihr Auto bewerten lassen",
  ctaText = "Kostenlos und unverbindlich - wir kommen zu Ihnen!",
  ctaButtonText = "Kostenlose Bewertung starten"
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  return (
    <div className="content-page">
      <SEO
        title={seoTitle || title}
        description={seoDescription}
        keywords={seoKeywords}
      />

      {/* Hero Section */}
      <section className="content-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs || []} />
          <div className="content-hero-inner">
            <h1 className="content-title">{title}</h1>
            {subtitle && <p className="content-subtitle">{subtitle}</p>}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-section">
        <div className="container">
          <div className="content-layout">
            {/* Main Content Area */}
            <article className="content-main">
              <div className="content-body">
                {content}
              </div>

              {/* FAQs */}
              {faqs && faqs.length > 0 && (
                <div className="content-faqs">
                  <h2>Häufig gestellte Fragen</h2>
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className={`faq-item ${openFaqIndex === index ? 'active' : ''}`}
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="faq-question">
                        {faq.question}
                        <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
                      </h3>
                      <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar with Related Links */}
            {relatedLinks && relatedLinks.length > 0 && (
              <aside className="content-sidebar">
                <RelatedLinks 
                  title="Weitere Informationen" 
                  links={relatedLinks} 
                />
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-cta">
        <div className="container">
          <div className="cta-box">
            <h2>{ctaTitle}</h2>
            <p>{ctaText}</p>
            <Link to="/bewertung" className="btn btn-primary btn-large">
              {ctaButtonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContentPage;

