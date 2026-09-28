'use client';

import React from 'react';

type ApplyLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  href: string;
  source: string;
  eventName?: string;
  params?: Record<string, string | number | boolean>;
};

/**
 * External link to the official AIESEC application portal.
 * Reports a GA4 event when analytics is present, and degrades silently when it is not.
 */
export const ApplyLink: React.FC<ApplyLinkProps> = ({
  href,
  source,
  eventName = 'apply_click',
  params,
  children,
  ...anchorProps
}) => {
  const handleClick = () => {
    window.gtag?.('event', eventName, { source, ...params });
  };

  return (
    <a
      {...anchorProps}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
