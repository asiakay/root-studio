import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <div className="service-card">
    <span className="service-icon" aria-hidden="true">
      {service.icon}
    </span>
    <h3>{service.name}</h3>
    <p>{service.description}</p>
    <span className="price-badge">{service.price}</span>
  </div>
);

export default ServiceCard;
