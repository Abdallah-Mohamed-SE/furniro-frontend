import type { Metadata } from "next";
import { BookOpen, Clock } from "lucide-react";
import type { BlogPost } from "@/types/post";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "المدونة | معمل الواجهات",
  description:
    "أحدث المقالات والأفكار التقنية في تطوير الويب وتصميم منتجات SaaS الحديثة",
};

async function getPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("فشل جلب المقالات من الخادم. يرجى المحاولة مرة أخرى.");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="flex-1 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <Badge variant="info">المقالات والأفكار</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            مدونة معمل الواجهات
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
            دروس، تجارب، وأفضل الممارسات الهندسية لبناء تطبيقات ويب عصرية
            وسريعة.
          </p>
        </header>

        {/* Blog Posts Grid */}
        <section aria-label="قائمة مقالات المدونة">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col justify-between border-slate-200/90 hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <article className="flex flex-1 flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="text-xs">
                      مقال #{post.id}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>3 دقائق قراءة</span>
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 leading-snug capitalize line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.body}
                  </p>
                </article>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-primary">
                  <span className="inline-flex items-center gap-1.5 hover:underline cursor-pointer">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>اقرأ المقال كاملاً</span>
                  </span>
                  <span className="text-slate-400">كاتب #{post.userId}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
