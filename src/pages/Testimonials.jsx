import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import TestimonialCard from '../components/TestimonialCard';
import TestimonialSubmissionForm from '../components/TestimonialSubmissionForm';

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => base44.entities.Testimonial.list('-created_date'),
  });

  return (
    <div className="pt-16">
      <Section theme="light" id="testimonials">
        <SectionHeading title="What Clients Say" subtitle="Testimonials" theme="light" />
        <p className="text-center text-gray-500 font-inter -mt-8 mb-12 max-w-xl mx-auto">
          Real reviews from real clients. Worked with me? Add your own testimonial below.
        </p>

        {/* Submission Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <TestimonialSubmissionForm />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-widest">
            <MessageSquare size={14} /> Client Reviews
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Submitted Testimonials */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-light-secondary rounded-xl p-6">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-200 mb-4" />
                <Skeleton className="h-4 w-full bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-3/4 bg-gray-200 mb-4" />
                <Skeleton className="h-10 w-1/2 bg-gray-200" />
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 font-inter text-lg">No testimonials yet</p>
            <p className="text-gray-300 font-mono text-sm mt-2">Be the first to share your experience above</p>
          </div>
        )}
      </Section>
    </div>
  );
}
