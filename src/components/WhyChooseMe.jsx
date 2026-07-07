import { motion } from 'framer-motion';
import {
  Zap, Smartphone, MessageCircle, Search, Bot, ShieldCheck,
  Palette, RefreshCw, MapPin, Lock, LifeBuoy, Trophy
} from 'lucide-react';

const CARDS = [
  {
    icon: Zap,
    title: 'Fast Delivery. Every Time.',
    description: "I treat your deadline like my own. Whether it's 24 hours or 7 days — I plan, execute and deliver on time without compromising quality.",
    badge: 'On-Time Guarantee',
    badgeColor: 'green',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First by Default',
    description: "Every website I build is designed for phones first — then scaled up. Over 80% of Kenyan users browse on mobile. Your site will look perfect on every screen.",
    badge: 'Responsive Design',
    badgeColor: 'blue',
  },
  {
    icon: MessageCircle,
    title: "You're Never Left Guessing",
    description: "I send regular progress updates, respond to messages within 2 hours and keep you informed at every stage. No ghosting. No confusion. Just clarity.",
    badge: 'Always Reachable',
    badgeColor: 'green',
  },
  {
    icon: Search,
    title: 'Built to Rank on Google',
    description: "SEO is not an afterthought — it's baked into every project from the start. Meta tags, sitemaps, structured data, page speed and keyword optimization included.",
    badge: 'SEO Specialist',
    badgeColor: 'blue',
  },
  {
    icon: Bot,
    title: 'AI Tools for Faster Results',
    description: "I leverage cutting-edge AI tools including Bolt.new, v0.dev, Cursor AI and Claude to build faster, smarter and more efficiently — saving you time and money.",
    badge: 'AI Expert',
    badgeColor: 'purple',
  },
  {
    icon: ShieldCheck,
    title: 'Fair Pricing. No Surprises.',
    description: "I give clear quotes upfront with no hidden charges. You know exactly what you're paying for before work begins. Quality digital work at Kenyan market rates.",
    badge: 'No Hidden Fees',
    badgeColor: 'green',
  },
  {
    icon: Palette,
    title: 'Designer & Developer Combined',
    description: "I handle both the visual design and the technical development — no need to hire two people. From logo to live website — I do it all under one roof.",
    badge: 'Full Service',
    badgeColor: 'orange',
  },
  {
    icon: RefreshCw,
    title: "Revisions Until You're Happy",
    description: "I don't consider a project done until you love it. I offer revisions and refinements throughout the process — your satisfaction is the finish line.",
    badge: 'Client-First',
    badgeColor: 'green',
  },
  {
    icon: MapPin,
    title: 'I Know the Kenyan Market',
    description: "From M-Pesa integration to Africa's Talking SMS to local business culture — I build solutions that work specifically for the Kenyan business environment.",
    badge: 'Local Expert',
    badgeColor: 'green',
  },
  {
    icon: Lock,
    title: 'Clean, Secure & Scalable Code',
    description: "Every project I deliver is written with security best practices, proper authentication, input validation and code structure that can scale as your business grows.",
    badge: 'Enterprise Grade',
    badgeColor: 'blue',
  },
  {
    icon: LifeBuoy,
    title: "I Don't Disappear After Launch",
    description: "After going live I provide 30 days of free support for bug fixes and minor updates. Long-term maintenance packages also available for growing businesses.",
    badge: '30-Day Support',
    badgeColor: 'orange',
  },
  {
    icon: Trophy,
    title: '20+ Projects. Happy Clients.',
    description: "From Nairobi restaurants to Thika car hire platforms to enterprise SaaS dashboards — I have delivered real results for real businesses across Kenya and beyond.",
    badge: 'Portfolio Proven',
    badgeColor: 'purple',
  },
];

const BADGE_STYLES = {
  green: 'bg-[#052e16] text-[#22C55E]',
  blue: 'bg-[#1e3a5f] text-[#3B82F6]',
  purple: 'bg-[#1e1b4b] text-[#8B5CF6]',
  orange: 'bg-[#431407] text-[#F97316]',
};

export default function WhyChooseMe() {
  return (
    <div className="relative mt-20">
      {/* Ambient blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top center, rgba(37,99,235,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative">
        {/* Label */}
        <p className="text-center text-electric text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
          Why Frankline
        </p>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-sora font-bold text-dark-bg text-center mb-3">
          Why Choose Me
        </h3>

        {/* Subheading */}
        <p className="text-center text-gray-500 font-inter text-base md:text-lg mb-12 max-w-2xl mx-auto">
          Not just a developer. A digital partner who delivers.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 12px 32px rgba(37, 99, 235, 0.15), inset 3px 0 0 #2563EB, 0 0 12px rgba(37,99,235,0.2)',
                  borderColor: '#2563EB',
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                className="group bg-[#111111] border border-[#1F1F1F] rounded-lg p-6 transition-all duration-300"
                style={{ borderLeft: '3px solid #2563EB' }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-electric" />
                </div>

                {/* Title */}
                <h4 className="text-white font-sora font-bold text-base mb-2">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="text-[#9CA3AF] font-inter text-sm leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wide ${BADGE_STYLES[card.badgeColor]}`}>
                  {card.badge}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
