'use client';

import React from 'react';
import { AccordionItem } from '@/components/ui/Accordion';
import { SITE_METADATA } from '@/lib/constants';
import { Mail } from 'lucide-react';

const faqs = [
  {
    id: 'faq-1',
    question: 'What is AIESEC Global Volunteer (iGV)?',
    answer:
      'Global Volunteer is an international volunteer experience enabling young people aged 18–30 to work on high-impact social projects abroad. Incoming Global Volunteer (iGV) in Bhopal connects international volunteers with local communities and schools to work on projects aligned with UN Sustainable Development Goals.',
  },
  {
    id: 'faq-2',
    question: 'Who can participate in Global Volunteer?',
    answer:
      'Any young person aged 18 to 30 with a passion for cross-cultural exchange and social impact can apply. No specific academic degree is required, though good communication skills in English and adaptability are essential.',
  },
  {
    id: 'faq-3',
    question: 'How long is the program and what are typical project dates?',
    answer:
      'Global Volunteer projects typically run for 6 to 8 weeks. Realization dates vary by project. You can inspect exact start/end dates and registration deadlines on each open project card above.',
  },
  {
    id: 'faq-4',
    question: 'What benefits and support does AIESEC in Bhopal provide?',
    answer:
      'AIESEC in Bhopal provides airport pickup guidance, host family or volunteer accommodation assistance, cultural integration workshops, local transportation guidance, and a dedicated local committee buddy throughout your exchange.',
  },
  {
    id: 'faq-5',
    question: 'How does the application process work?',
    answer:
      'When you click "Apply Now" on any project, you are redirected to the official AIESEC Opportunity Portal. There you complete your exchange profile and submit your official application. The AIESEC team in Bhopal will schedule an online interview with you upon receiving your application.',
  },
  {
    id: 'faq-6',
    question: 'Where can I get help or ask questions before applying?',
    answer: `If you have questions regarding visa procedures, project logistics, or eligibility, you can contact the AIESEC in Bhopal team directly at ${SITE_METADATA.contactEmail}.`,
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F5F2EB] text-[#0B0C10]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12">
          {/* Left: Sticky masthead */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/50 mb-8">
                <span className="w-8 h-px bg-[#0B0C10]/30" />
                <span>Got questions</span>
              </div>

              <h2 className="text-[13vw] sm:text-[9vw] lg:text-[5.5vw] font-black uppercase tracking-tighter leading-[0.88]">
                Frequently
                <br />
                <span className="font-serif font-normal italic tracking-normal text-[#0B0C10]/35">
                  asked questions
                </span>
              </h2>

              <p className="text-base text-[#0B0C10]/55 leading-relaxed mt-6 max-w-sm">
                Everything you need to know about volunteering in Bhopal with AIESEC.
              </p>

              <div className="mt-8 pt-8 border-t border-[#0B0C10]/15 max-w-sm">
                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-[#0B0C10]/40 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B0C10]">
                      Still have questions?
                    </h3>
                    <p className="text-[13px] text-[#0B0C10]/55 leading-relaxed mt-1.5">
                      Our local committee exchange managers are here to assist you before, during
                      and after your exchange.
                    </p>
                    <a
                      href={`mailto:${SITE_METADATA.contactEmail}`}
                      className="mt-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] bg-[#0B0C10] text-[#F9F8F6] px-6 py-3.5 hover:bg-[#037EF3] transition-colors min-h-[44px] inline-flex items-center focus-visible:outline-none"
                    >
                      {SITE_METADATA.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Accordion list */}
          <div className="lg:col-span-7 lg:border-l lg:border-[#0B0C10]/15 lg:pl-12">
            <div className="flex items-center justify-between pb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40">
              <span>Index</span>
              <span>{String(faqs.length).padStart(2, '0')} entries</span>
            </div>

            <div className="border-t border-[#0B0C10]/15">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={faq.id}
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  index={idx}
                  defaultOpen={idx === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
