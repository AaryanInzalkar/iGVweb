'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Testimonial } from '@/types/testimonial';

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({ testimonial, onClose }) => {
  // While open: close on Escape and stop the page from scrolling behind the modal.
  useEffect(() => {
    if (!testimonial) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [testimonial, onClose]);

  // Returning null when closed also keeps createPortal off the server render path.
  if (!testimonial) return null;

  // Same fallback as the spiral cards: generated initials avatar when no photo.
  const imageSrc =
    testimonial.image_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.volunteer_name)}&background=037EF3&color=fff&size=512&bold=true`;

  // Portalled to <body> so the parallax/transform stacking contexts in the
  // section can't trap the overlay underneath other page chrome.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonial from ${testimonial.volunteer_name}`}
    >
      <div
        className="modal-backdrop-reveal absolute inset-0 bg-[#0B0C10]/65 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="modal-reveal relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="grid sm:grid-cols-[300px_1fr]">
          {/* Left: full photo, never cropped — blurred fill prevents empty bars */}
          <div className="relative h-56 overflow-hidden bg-[#0B0C10] sm:h-auto sm:min-h-[340px]">
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-xl"
            />
            <img
              src={imageSrc}
              alt={testimonial.image_alt_text || testimonial.volunteer_name}
              className="relative h-full w-full object-contain"
            />
          </div>

          {/* Right: volunteer identity + testimony */}
          <div className="flex flex-col justify-center space-y-4 p-6 sm:p-10">
            <div>
              <div className="text-2xl font-black tracking-tight text-[#0B0C10]">
                {testimonial.volunteer_name}
              </div>
              <div className="mt-1 text-sm font-bold text-[#037EF3]">
                {testimonial.project_name
                  ? `${testimonial.country} • ${testimonial.project_name}`
                  : testimonial.country}
              </div>
            </div>

            <span aria-hidden="true" className="block text-5xl font-black leading-none text-[#037EF3]">
              &ldquo;
            </span>
            <p className="text-base sm:text-lg leading-relaxed text-[#374151] italic">
              {testimonial.quote}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close testimonial"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};
