'use client';

import { useEffect } from 'react';

export default function AdBlocker() {
  useEffect(() => {
    // Block common ad domains
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
      'googlesyndication.',
      'googletagmanager.',
      'facebook.net',
      'facebook.com',
      'twitter.com',
      'linkedin.com',
      'pinterest.com',
      'reddit.com',
      'quora.com',
      'medium.com',
      'tumblr.com',
      'instagram.com',
      'snapchat.com',
      'tiktok.com',
      'youtube.com/ads',
      'youtube.com/embed',
      'youtube.com/watch',
      'youtube.com/channel',
      'youtube.com/user',
      'youtube.com/playlist',
      'youtube.com/results',
      'youtube.com/search',
      'youtube.com/feed',
      'youtube.com/subscriptions',
      'youtube.com/history',
      'youtube.com/library',
      'youtube.com/account',
      'youtube.com/settings',
      'youtube.com/help',
      'youtube.com/about',
      'youtube.com/press',
      'youtube.com/blog',
      'youtube.com/creators',
      'youtube.com/partners',
      'youtube.com/ads',
      'youtube.com/adsense',
      'youtube.com/analytics',
      'youtube.com/studio',
      'youtube.com/music',
      'youtube.com/gaming',
      'youtube.com/kids',
      'youtube.com/tv',
      'youtube.com/movies',
      'youtube.com/sports',
      'youtube.com/news',
      'youtube.com/live',
      'youtube.com/premium',
      'youtube.com/red',
      'youtube.com/originals',
      'youtube.com/trending',
      'youtube.com/browse',
      'youtube.com/discover',
      'youtube.com/explore',
      'youtube.com/trending',
      'youtube.com/browse',
      'youtube.com/discover',
      'youtube.com/explore'
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

    // Block XMLHttpRequest to ad domains
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      const xhr = new originalXHR();
      const originalOpen = xhr.open;
      xhr.open = function(method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null) {
        if (typeof url === 'string') {
          const isBlocked = blockedDomains.some(domain => url.includes(domain));
          if (isBlocked) {
            console.warn(`Blocked XHR request to: ${url}`);
            throw new Error('Blocked by ad blocker');
          }
        }
        return originalOpen.call(this, method, url, async ?? true, username, password);
      };
      return xhr;
    } as any;

    // Block navigation to ad domains
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      const url = args[2] as string;
      if (typeof url === 'string') {
        const isBlocked = blockedDomains.some(domain => url.includes(domain));
        if (isBlocked) {
          console.warn(`Blocked navigation to: ${url}`);
          return;
        }
      }
      return originalPushState.apply(this, args);
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
      const url = args[2] as string;
      if (typeof url === 'string') {
        const isBlocked = blockedDomains.some(domain => url.includes(domain));
        if (isBlocked) {
          console.warn(`Blocked navigation to: ${url}`);
          return;
        }
      }
      return originalReplaceState.apply(this, args);
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

    // Block iframe creation to ad domains
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName, ...args) {
      const element = originalCreateElement.call(this, tagName, ...args);
      if (tagName.toLowerCase() === 'iframe') {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function(name, value) {
          if (name === 'src' && typeof value === 'string') {
            const isBlocked = blockedDomains.some(domain => value.includes(domain));
            if (isBlocked) {
              console.warn(`Blocked iframe src: ${value}`);
              return;
            }
          }
          return originalSetAttribute.call(this, name, value);
        };
      }
      return element;
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
      window.XMLHttpRequest = originalXHR;
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.open = originalOpen;
      document.createElement = originalCreateElement;
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
