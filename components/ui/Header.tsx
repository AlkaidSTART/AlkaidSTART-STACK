'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, User, Mail, Github, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Search from '../Search';
import { usePageStore } from '@/stores/pageStore';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const navItems = [
  { path: '/', labelEn: 'Home', labelZh: '首页', icon: Home },
  { path: '/blog', labelEn: 'Blog', labelZh: '博客', icon: BookOpen },
  { path: '/about', labelEn: 'About', labelZh: '关于', icon: User },
  { path: '/contact', labelEn: 'Contact', labelZh: '联系', icon: Mail },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const { 
    isBlogPost, 
    isAboutPage, 
    isContactPage, 
    setIsBlogPost, 
    setIsAboutPage, 
    setIsContactPage, 
    resetPageStates 
  } = usePageStore();

  // 检测当前页面类型
  useEffect(() => {
    const isBlogArticle = pathname?.startsWith('/blog/') && pathname !== '/blog';
    const isAbout = pathname === '/about';
    const isContact = pathname === '/contact';

    if (isBlogArticle) {
      setIsBlogPost(true);
    } else if (isAbout) {
      setIsAboutPage(true);
    } else if (isContact) {
      setIsContactPage(true);
    } else {
      // 在主页或其他页面时重置状态
      resetPageStates();
    }
  }, [pathname, setIsBlogPost, setIsAboutPage, setIsContactPage, resetPageStates]);

  // 路由变化时关闭移动菜单
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
    };
    
    handleRouteChange();
  }, [pathname]);

  useEffect(() => {
    // 从localStorage或浏览器语言获取初始语言设置
    const initializeLanguage = () => {
      const stored = localStorage.getItem('lang');
      const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
      const initial = (stored === 'zh' || stored === 'en') ? stored : browserLang;
      
      // 设置文档语言属性
      document.documentElement.dataset.lang = initial;
      localStorage.setItem('lang', initial);
    };
    
    initializeLanguage();
  }, []);

  const toggleLang = () => {
    const currentLang = document.documentElement.dataset.lang || 'en';
    const next = currentLang === 'en' ? 'zh' : 'en';
    document.documentElement.dataset.lang = next;
    localStorage.setItem('lang', next);
  };

  // 如果在博客文章、关于或联系页面，不显示header
  if (isBlogPost || isAboutPage || isContactPage) {
    return null;
  }

  return (
    <div className="fixed top-6 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4">
      {/* iOS 26液态玻璃背景效果 */}
      <div className="ios-26-liquid-glass-backdrop absolute inset-y-0 left-4 right-4 -z-10 rounded-3xl border border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-[60px] backdrop-saturate-200 dark:border-white/15 dark:from-black/30 dark:to-black/10" />
      
      {/* 增强的液态玻璃效果 */}
      <div className="ios-26-liquid-glow absolute inset-y-0 left-4 right-4 -z-10 rounded-3xl" />
      <div className="ios-26-liquid-highlight absolute inset-y-0 left-4 right-4 -z-10 rounded-3xl" />
      <div className="ios-26-liquid-shadow absolute inset-y-0 left-4 right-4 -z-10 rounded-3xl" />
      
      {/* 动态光效 */}
      <div className="ios-26-liquid-shine absolute inset-y-0 left-4 right-4 -z-10 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <header 
        ref={headerRef}
        className="ios-26-liquid-glass group flex h-16 items-center justify-between px-6 cursor-pointer"
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="hidden font-extrabold sm:block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              AlkaidLight
            </span>
          </Link>
          
          <nav className="hidden items-center gap-2 sm:flex">
            {navItems.map((item) => {
              const isActive = item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path);
              
              return (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`ios-26-liquid-nav-item relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                    isActive ? 'active text-gray-900 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-white/10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon className={`h-4 w-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="lang-en">{item.labelEn}</span>
                    <span className="lang-zh">{item.labelZh}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Search />
          <button
            type="button"
            onClick={toggleLang}
            className="ios-26-liquid-button relative inline-flex h-8 w-20 items-center rounded-2xl p-1 transition-all"
            aria-label="Toggle language"
          >
            <div className="toggle-bg absolute left-1 h-6 w-[calc(50%-4px)] rounded-2xl bg-white shadow-sm dark:bg-gray-600" />
            <span className="z-10 w-1/2 text-center text-[10px] font-bold toggle-text-en">EN</span>
            <span className="z-10 w-1/2 text-center text-[10px] font-bold toggle-text-zh">中文</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ios-26-liquid-button flex h-9 w-9 items-center justify-center text-gray-600 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="ios-26-liquid-button flex h-9 w-9 items-center justify-center text-gray-600 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="ios-26-liquid-mobile-menu absolute left-4 right-4 top-20 flex flex-col gap-2 rounded-3xl p-4"
          >
            {navItems.map((item) => {
              const isActive = item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`ios-26-liquid-nav-item flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'active text-gray-900 dark:text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="lang-en">{item.labelEn}</span>
                  <span className="lang-zh">{item.labelZh}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}