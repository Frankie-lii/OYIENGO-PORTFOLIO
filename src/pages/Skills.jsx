import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import SkillCategory from '../components/SkillCategory';

const SKILL_CATEGORIES = [
  {
    icon: '💻',
    name: 'Fullstack Development',
    skills: ['React', 'Node.js', 'Firebase', 'Supabase', 'Responsive Design', 'API Integration', 'MongoDB', 'Tailwind CSS', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Website Deployment'],
  },
  {
    icon: '🎨',
    name: 'Graphic Design',
    skills: ['Poster Design', 'Branding', 'Social Media Designs', 'Flyer Design', 'Canva', 'Photoshop'],
  },
  {
    icon: '🔍',
    name: 'SEO Specialist',
    skills: ['On-Page SEO', 'Technical SEO', 'Keyword Optimization', 'Google Ranking', 'Website Speed Optimization', 'Sitemap & Schema'],
  },
  {
    icon: '📊',
    name: 'Data Entry Specialist',
    skills: ['Excel', 'Google Sheets', 'Data Cleaning', 'PDF Conversion', 'Web Research', 'Data Organization'],
  },
  {
    icon: '🤖',
    name: 'AI Solutions',
    skills: ['AI Website Builders', 'AI Content Assistance', 'Chatbot Integration', 'Prompt Engineering', 'Bolt.new', 'v0.dev'],
  },
];

export default function Skills() {
  return (
    <div className="pt-16">
      <Section theme="dark" id="skills">
        <SectionHeading title="My Tech Stack & Skills" subtitle="What I Know" theme="dark" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategory key={cat.name} category={cat} index={i} />
          ))}
        </div>
      </Section>
    </div>
  );
}
