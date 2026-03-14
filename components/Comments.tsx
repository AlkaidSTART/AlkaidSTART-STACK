'use client';

import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function Comments() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // 初始化组件状态
    const initializeComments = () => {
      setMounted(true);
      
      // Initial language sync
      const currentLang = document.documentElement.dataset.lang || 'en';
      setLang(currentLang);
    };
    
    initializeComments();
    
    // Observe language changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-lang') {
          const newLang = document.documentElement.dataset.lang || 'en';
          setLang(newLang);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-lang'],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-12">
      <Giscus
        repo="your-username/your-repo"
        repoId="your-repo-id"
        category="General"
        categoryId="your-category-id"
        mapping="pathname"
        term="Welcome to AlkaidLight Blog!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang={lang}
        loading="lazy"
      />
    </div>
  );
}