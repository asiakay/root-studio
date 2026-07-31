import type { CustomApp } from '../types';

interface CustomAppCardProps {
  app: CustomApp;
}

const CustomAppCard: React.FC<CustomAppCardProps> = ({ app }) => (
  <div className="service-card">
    <span className="service-icon" aria-hidden="true">
      {app.icon}
    </span>
    <h3>{app.name}</h3>
    <p>{app.description}</p>
    {app.link ? (
      <a
        href={app.link}
        className="app-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {app.linkLabel}
      </a>
    ) : (
      <span className="app-link app-link--placeholder">{app.linkLabel}</span>
    )}
  </div>
);

export default CustomAppCard;
