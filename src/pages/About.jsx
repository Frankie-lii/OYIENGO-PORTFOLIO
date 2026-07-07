import { motion } from 'framer-motion';
import { Code2, Palette, Search, Bot, MapPin, Globe, Zap, DollarSign, Download } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';

const ABOUT_IMAGE = 'https://media.base44.com/images/public/6a01a544f0f9f9e0d4e13dc9/1829f2e2b_image.png';

const WHAT_I_DO = [
  { icon: <Code2 className="w-6 h-6" />, title: 'Web Development', desc: 'Modern, responsive websites built with the latest tech stack.' },
  { icon: <Palette className="w-6 h-6" />, title: 'Graphic Design', desc: 'Eye-catching posters, logos, flyers and branding materials.' },
  { icon: <Search className="w-6 h-6" />, title: 'SEO Optimization', desc: 'Boost your Google ranking with proven SEO strategies.' },
  { icon: <Bot className="w-6 h-6" />, title: 'AI Solutions', desc: 'AI-powered automation, chatbots and smart digital tools.' },
];

const FUN_FACTS = [
  { icon: <MapPin size={16} />, text: 'Based in Ngong, Kajiado' },
  { icon: <Globe size={16} />, text: 'Available for Remote Work' },
  { icon: <Zap size={16} />, text: 'Fast Delivery' },
  { icon: <DollarSign size={16} />, text: 'Affordable Pricing' },
];

export default function About() {
  return (
    <div className="pt-16">
      <Section theme="light" id="about">
        <SectionHeading title="About Me" subtitle="Who I Am" theme="light" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-electric/10 rounded-2xl -rotate-3" />
              <img
                src={ABOUT_IMAGE}
                alt="Frankline Oyiengo"
                className="relative w-72 md:w-80 h-auto rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 font-inter text-lg leading-relaxed mb-6">
              I'm a passionate Fullstack Developer and Digital Solutions Specialist focused on creating modern websites, strong visual branding, SEO strategies, and AI-powered solutions.
            </p>
            <p className="text-gray-600 font-inter text-lg leading-relaxed mb-8">
              I help businesses and individuals improve their online presence with clean design, functionality, and smart digital systems.
            </p>
            <a
              href="https://media.base44.com/files/public/6a01a544f0f9f9e0d4e13dc9/9a4ec3885_Frankline_Oyiengo_CV.docx"
              download="Frankline_Oyiengo_CV.docx"
              className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-full hover:bg-electric-bright transition-all hover:shadow-lg hover:shadow-electric/30"
            >
              <Download size={18} /> Download CV
            </a>
          </motion.div>
        </div>

        {/* What I Do */}
        <div className="mb-16">
          <h3 className="text-2xl font-sora font-bold text-dark-bg text-center mb-10">What I Do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_I_DO.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-light-secondary rounded-xl p-6 border border-gray-100 hover:border-electric/30 hover:shadow-lg hover:shadow-electric/5 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-electric/10 text-electric flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="font-sora font-semibold text-dark-bg mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm font-inter">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="flex flex-wrap justify-center gap-4">
          {FUN_FACTS.map((fact) => (
            <div key={fact.text} className="flex items-center gap-2 px-5 py-2.5 bg-dark-bg text-white rounded-full text-sm font-inter">
              <span className="text-electric">{fact.icon}</span>
              {fact.text}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
