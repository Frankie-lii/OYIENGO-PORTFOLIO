import { motion } from 'framer-motion';
import { Globe, Briefcase, ShoppingCart, FileImage, FileText, Pen, Search, Database, Bot, Share2, Sparkles, Smartphone, Zap, BarChart3, DollarSign, Cpu } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import WhyChooseMe from '../components/WhyChooseMe';

const SERVICES = [
  { icon: '🌐', name: 'Business Website', description: 'Professional, modern business websites tailored to your brand.', priceRange: 'Starting from KSh 8,000' },
  { icon: '💼', name: 'Portfolio Website', description: 'Showcase your work with a stunning personal portfolio.', priceRange: 'Starting from KSh 5,000' },
  { icon: '🛒', name: 'E-commerce Website', description: 'Full online stores with payment integration and product management.', priceRange: 'Starting from KSh 15,000' },
  { icon: '🎨', name: 'Graphic Design', description: 'Logos, posters, flyers and branding that make your business stand out.', priceRange: 'Starting from KSh 500' },
  { icon: '🔍', name: 'SEO Optimization', description: 'Improve your Google ranking with proven SEO strategies.', priceRange: 'Starting from KSh 3,000' },
  { icon: '📊', name: 'Data Entry Services', description: 'Accurate and efficient data entry, cleaning and organization.', priceRange: 'Starting from KSh 500' },
  { icon: '🤖', name: 'AI Automation Setup', description: 'Smart AI solutions to automate your business processes.', priceRange: 'Starting from KSh 5,000' },
];



export default function Services() {
  return (
    <div className="pt-16">
      <Section theme="light" id="services">
        <SectionHeading title="What I Offer" subtitle="My Services" theme="light" />
        <p className="text-center text-gray-500 font-inter text-lg -mt-8 mb-12 max-w-2xl mx-auto">
          Professional digital services tailored to your budget and goals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm font-inter mb-20">
          * Prices vary depending on project complexity and client requirements. Contact me for a custom quote.
        </p>

        {/* Why Choose Me */}
        <WhyChooseMe />
      </Section>
    </div>
  );
}
