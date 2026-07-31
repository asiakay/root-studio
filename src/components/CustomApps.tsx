import CustomAppCard from './CustomAppCard';
import { CUSTOM_APPS } from '../data/content';

const CustomApps: React.FC = () => (
  <section className="section">
    <p className="section-label">Custom Applications</p>
    <p className="section-intro">
      Beyond web and brand work, Root Studio builds custom applications — tools
      that solve a specific operational problem, not just look good.
    </p>
    <div className="services-grid">
      {CUSTOM_APPS.map((app) => (
        <CustomAppCard key={app.name} app={app} />
      ))}
    </div>
  </section>
);

export default CustomApps;
