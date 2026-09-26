'use client';

import React from 'react';
import { AccordionItem } from '@/components/ui/Accordion';
import { SITE_METADATA } from '@/lib/constants';
import { HelpCircle, Mail } from 'lucide-react';

export const FAQSection: React.FC = () => {
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

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F7F5F0] text-[#071B2F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#037EF3]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071B2F]">
            Frequently Asked <span className="text-[#037EF3]">Questions</span>
          </h2>

          <p className="text-base sm:text-lg text-[#5B6573]">
            Everything you need to know about volunteering in Bhopal with AIESEC.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={idx === 0}
            />
          ))}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-[#037EF3]/10 text-[#037EF3] rounded-xl shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#071B2F]">Still have questions?</h3>
              <p className="text-xs text-[#5B6573]">
                Our local committee exchange managers are here to assist you.
              </p>
            </div>
          </div>
          <a
            href={`mailto:${SITE_METADATA.contactEmail}`}
            className="px-4 py-2 bg-[#071B2F] text-white rounded-lg font-bold text-xs hover:bg-[#037EF3] transition-colors whitespace-nowrap min-h-[44px] flex items-center justify-center"
          >
            Email {SITE_METADATA.contactEmail}
          </a>
        </div>
      </div>
    </section>
  );
};
