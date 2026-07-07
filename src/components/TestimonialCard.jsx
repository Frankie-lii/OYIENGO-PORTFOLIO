import { Star, Quote, User } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-light-secondary rounded-xl p-6 border border-gray-100 flex flex-col h-full">
      <Quote className="w-8 h-8 text-electric/30 mb-3" />
      <p className="text-gray-600 text-sm font-inter leading-relaxed mb-4 italic flex-1">
        "{testimonial.review}"
      </p>
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        {testimonial.photo ? (
          <img src={testimonial.photo} alt={testimonial.client_name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0">
            <User size={18} className="text-electric/60" />
          </div>
        )}
        <div>
          <p className="text-dark-bg font-sora font-semibold text-sm">{testimonial.client_name}</p>
          <p className="text-gray-400 text-xs font-inter">{[testimonial.client_title, testimonial.company].filter(Boolean).join(' · ')}</p>
        </div>
      </div>
    </div>
  );
}
