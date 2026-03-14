import Comments from '@/components/Comments';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// 定义MDX组件映射，解决自定义标签报错问题
const components = {
  note: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20">
      <div className="flex items-start">
        <div className="ml-3">
          <p className="text-sm text-blue-700 dark:text-blue-300">{children}</p>
        </div>
      </div>
    </div>
  ),
  warning: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:border-yellow-400 dark:bg-yellow-900/20">
      <div className="flex items-start">
        <div className="ml-3">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">{children}</p>
        </div>
      </div>
    </div>
  ),
};

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Params = Promise<{ slug: string }>;

export default async function BlogPost(props: { params: Params }) {
  const params = await props.params;
  const { slug } = params;
  const post = getPostData(slug);

  return (
    <div className="min-h-screen">
      {/* 液态玻璃风格的返回按钮 */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/blog" 
          className="ios-26-liquid-button flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="lang-en">Back to Blog</span>
          <span className="lang-zh">返回博客</span>
        </Link>
      </div>

      <article className="container mx-auto px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="mb-8 text-center">
            <time dateTime={post.date} className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
              {post.date}
            </time>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex justify-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
            <MDXRemote source={post.content} components={components} />
          </div>
          <Comments />
        </div>
      </article>
    </div>
  );
}