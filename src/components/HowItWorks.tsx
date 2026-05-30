import { STEPS } from '../data/content';

const HowItWorks: React.FC = () => (
  <section className="section">
    <p className="section-label">How it works</p>
    <ol className="steps-list">
      {STEPS.map((step) => (
        <li key={step.number} className="step">
          <span className="step-num" aria-hidden="true">
            {step.number}
          </span>
          <div className="step-body">
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
