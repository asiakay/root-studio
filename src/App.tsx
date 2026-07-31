import Hero from './components/Hero';
import Services from './components/Services';
import CustomApps from './components/CustomApps';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import CTA from './components/CTA';
import './App.css';

const App: React.FC = () => (
  <main className="page">
    <Hero />
    <Services />
    <CustomApps />
    <HowItWorks />
    <WhyUs />
    <CTA />
  </main>
);

export default App;
