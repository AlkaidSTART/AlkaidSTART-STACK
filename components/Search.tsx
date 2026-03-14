'use client';

import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

declare global {
  interface Window {
    pagefind: {
      search: (query: string) => Promise<{
        results: Array<{
          data: () => Promise<{
            url: string;
            meta: {
              title: string;
            };
            excerpt: string;
          }>;
        }>;
      }>;
    };
  }
}

export default function Search() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{
    url: string;
    meta: {
      title: string;
    };
    excerpt: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    async function loadPagefind() {
      // Only load in production or if file exists
      if (typeof window !== 'undefined' && typeof window.pagefind === 'undefined') {
        try {
          const pagefind = await import(/* webpackIgnore: true */ `${basePath}/pagefind/pagefind.js`);
          window.pagefind = pagefind;
        } catch (e) {
          // Silently fail in dev mode if not available
          console.log('Pagefind search not available (dev mode?)');
        }
      }
    }
    loadPagefind();
  }, []);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (value && window.pagefind) {
      setLoading(true);
      try {
        const search = await window.pagefind.search(value);
        const data = await Promise.all(search.results.map((r) => r.data()));
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }

  return (
    <div className="relative hidden sm:block w-64 h-10">
      {/* 液态玻璃搜索框 */}
      <div className={`ios-26-liquid-search absolute inset-0 rounded-full transition-all duration-300 overflow-hidden ${
        isFocused 
          ? 'scale-105 shadow-xl' 
          : 'hover:scale-102 hover:shadow-lg'
      }`}>
        <div className="absolute inset-0 bg-white/30 dark:bg-white/15 backdrop-blur-sm border border-white/40 dark:border-white/20 transition-all duration-300" />
        
        {/* 光效层 */}
        {isFocused && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
        )}
        
        <div className="relative flex items-center w-full h-full">
          <SearchIcon className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="搜索..."
            value={query}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full h-full rounded-full bg-transparent pl-10 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
          {loading && (
            <div className="absolute right-3 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300" />
          )}
        </div>
      </div>
      
      {results.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-hidden rounded-2xl border border-white/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-2xl dark:border-white/15 z-50">
          <div className="max-h-96 overflow-y-auto p-2">
            {results.map((result, idx) => (
              <a
                key={idx}
                href={result.url}
                className="block rounded-xl px-4 py-3 hover:bg-white/40 dark:hover:bg-white/10 transition-colors duration-200"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{result.meta.title}</h3>
                <p 
                  className="mt-1 text-xs text-gray-600 line-clamp-2 dark:text-gray-400" 
                  dangerouslySetInnerHTML={{ __html: result.excerpt }} 
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}