import ServiceCard from './ServiceCard';
import { SERVICES } from '../data/content';

const Services: React.FC = () => (
  <section className="section">
    <p className="section-label">What we do</p>
    <p className="section-intro">
      We build the infrastructure that lets your work show up right. Whether
      you're launching, refreshing, or finally getting things in order — we
      scope it clean, price it honest, and deliver work that holds up.
    </p>
    <div className="services-grid">
      {SERVICES.map((service) => (
        <ServiceCard key={service.name} service={service} />
      ))}
    </div>
  </section>
);

export default Services;
