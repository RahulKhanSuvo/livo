import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { blogPosts, blogCategories } from '@/components/blog/blog.data';

export const metadata = {
  title: 'Journal — Livo',
  description: 'Stories on craft, materials, and the way we live at home.',
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const activeCategory = category ?? 'all';

  const posts =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => p.id !== featured?.id);

  return (
    <div className="bg-[#f6f5f1] text-[#161512]">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-24">
        <p className="reveal text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d98e63]">
          The Journal
        </p>
        <h1 className="reveal reveal-delay-1 mt-4 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.95] sm:text-7xl">
          Stories about
          <br />
          <em className="text-[#4b6b56]">craft &amp; living</em>
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-xl text-sm leading-relaxed text-neutral-600">
          Essays and field notes from our atelier — on materials, light, and the small rituals that
          make a house a home.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="reveal reveal-delay-2 flex flex-wrap gap-2">
          {blogCategories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <Link
                key={cat.id}
                href={cat.id === 'all' ? '/blog' : `/blog?category=${cat.id}`}
                className={
                  'rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ' +
                  (isActive
                    ? 'bg-[#161512] text-[#f4f1e8]'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100')
                }
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </section>

      <Container className="pb-24">
        {featured && (
          <article className="reveal group grid grid-cols-1 overflow-hidden rounded-3xl bg-white lg:grid-cols-2">
            <Link
              href={`/blog/${featured.slug}`}
              className="relative aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-[480px]"
            >
              <Image
                src={featured.imageSrc}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#4b6b56]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#4b6b56]">
                  Featured
                </span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                  {featured.category}
                </span>
              </div>
              <Link href={`/blog/${featured.slug}`}>
                <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-3xl leading-tight sm:text-5xl">
                  {featured.title}
                </h2>
              </Link>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                {featured.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161512] text-xs font-semibold text-[#f4f1e8]">
                  {featured.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold">{featured.author}</p>
                  <p className="text-xs text-neutral-500">
                    {featured.authorRole} · {formatDate(featured.date)}
                  </p>
                </div>
                <span className="ml-auto text-xs text-neutral-400">{featured.readTime}</span>
              </div>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <article
                key={post.id}
                className={`reveal reveal-delay-${Math.min((index % 3) + 1, 6)} group flex flex-col overflow-hidden rounded-3xl bg-white`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-4/3 overflow-hidden bg-neutral-100"
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#d98e63]">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-neutral-400">{formatDate(post.date)}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="mt-4">
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
                    <span className="text-xs text-neutral-500">{post.author}</span>
                    <span className="text-xs text-neutral-400">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl">
              No stories here yet
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Try another category, or browse the full journal.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-block rounded-full bg-[#161512] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#f4f1e8] transition-colors hover:bg-[#4b6b56]"
            >
              All stories
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
