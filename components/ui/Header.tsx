'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Search from '../Search';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function Header() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
    const initial = (stored === 'zh' || stored === 'en') ? stored : browserLang;
    
    // Only update state if different from default 'en'
    if (initial !== 'en') {
      setLang(initial as 'en' | 'zh');
    }
    document.documentElement.dataset.lang = initial;
    localStorage.setItem('lang', initial);
  }, []);

  const toggleLang = () => {
    setLang((current) => {
      const next = current === 'en' ? 'zh' : 'en';
      document.documentElement.dataset.lang = next;
      localStorage.setItem('lang', next);
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <img src={`${basePath}/avatorone.jpg`} alt="AlkaidLight" className="h-8" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/blog" className="transition-colors hover:text-gray-600 dark:hover:text-gray-300">
              <span className="lang-en">Blog</span>
              <span className="lang-zh">博客</span>
            </Link>
            <Link href="/about" className="transition-colors hover:text-gray-600 dark:hover:text-gray-300">
              <span className="lang-en">About</span>
              <span className="lang-zh">关于</span>
            </Link>
            <Link href="/contact" className="transition-colors hover:text-gray-600 dark:hover:text-gray-300">
              <span className="lang-en">Contact</span>
              <span className="lang-zh">联系</span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Search />
          <button
            type="button"
            onClick={toggleLang}
            className="relative inline-flex h-9 w-24 items-center rounded-full bg-gray-100 p-1 transition-colors dark:bg-gray-800"
            aria-label="Toggle language"
          >
            <div className="toggle-bg absolute left-1 h-7 w-[calc(50%-4px)] rounded-full bg-white shadow-sm dark:bg-gray-600" />
            <span className="z-10 w-1/2 text-center text-xs font-medium toggle-text-en">EN</span>
            <span className="z-10 w-1/2 text-center text-xs font-medium toggle-text-zh">中文</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-gray-600 dark:hover:text-gray-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
