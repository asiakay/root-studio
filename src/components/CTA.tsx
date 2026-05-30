import { INQUIRY_EMAIL } from '../data/content';

const CTA: React.FC = () => (
  <section className="cta">
    <h2>Ready to get your work in front of the people it's for?</h2>
    <p>Tell us what you're working on — we'll take it from there.</p>
    <a href={`mailto:${INQUIRY_EMAIL}`} className="cta-btn">
      Start a conversation →
    </a>
  </section>
);

export default CTA;
