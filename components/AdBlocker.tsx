'use client';

import { useEffect } from 'react';

export default function AdBlocker() {
  useEffect(() => {
    // Block common ad and tracking domains
    const blockedDomains = [
      'stummelguider.top',
      'ads.',
      'tracking.',
      'analytics.',
      'doubleclick.',
      'googlesyndication.',
      'googletagmanager.',
      'facebook.com/tr',
      'amazon-adsystem.',
      'adsystem.amazon.',
      'outbrain.',
      'taboola.',
      'criteo.',
      'bing.com/ads',
      'ads.yahoo.',
      'adsystem.yahoo.',
      'googleadservices.',
      'googletagservices.',
      'facebook.net',
      'instagram.com',
      'snapchat.com',
      'tiktok.com',
    ];

    // Block requests to ad domains
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0] as string;
      if (typeof url === 'string') {
        const isBlocked = blockedDomains.some(domain => url.includes(domain));
        if (isBlocked) {
          console.warn(`Blocked fetch request to: ${url}`);
          return Promise.reject(new Error('Blocked by ad blocker'));
        }
      }
      return originalFetch.apply(this, args);
    };

    // Block popup windows
    const originalOpen = window.open;
    window.open = function(...args) {
      const url = args[0] as string;
      if (typeof url === 'string') {
        const isBlocked = blockedDomains.some(domain => url.includes(domain));
        if (isBlocked) {
          console.warn(`Blocked popup to: ${url}`);
          return null;
        }
      }
      return originalOpen.apply(this, args);
    };

    // Block script tags with ad domains
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'SCRIPT') {
              const src = element.getAttribute('src');
              if (src) {
                const isBlocked = blockedDomains.some(domain => src.includes(domain));
                if (isBlocked) {
                  console.warn(`Blocked script: ${src}`);
                  element.remove();
                }
              }
            }
            if (element.tagName === 'IFRAME') {
              const src = element.getAttribute('src');
              if (src) {
                const isBlocked = blockedDomains.some(domain => src.includes(domain));
                if (isBlocked) {
                  console.warn(`Blocked iframe: ${src}`);
                  element.remove();
                }
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      window.fetch = originalFetch;
      window.open = originalOpen;
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
