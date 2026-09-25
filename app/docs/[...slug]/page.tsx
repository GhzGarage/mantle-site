import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocsToc from "@/components/docs/DocsToc";
import LangSwitch from "@/components/docs/LangSwitch";
import { docHref, docsStaticParams, getDoc } from "@/lib/docs";

export const dynamicParams = false;
export const generateStaticParams = docsStaticParams;

export async function generateMetadata({ params }: PageProps<"/docs/[...slug]">): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.description, alternates: { canonical: docHref(doc.slug) } };
}

export default async function DocPage({ params }: PageProps<"/docs/[...slug]">) {
  const doc = getDoc((await params).slug);
  if (!doc) notFound();

  return (
    <div className="docs-page">
      <article className="docs-article">
        <p className="docs-eyebrow">Docs / {doc.section}</p>
        <h1>{doc.title}</h1>
        <p className="docs-lede">{doc.description}</p>
        {doc.hasLanguageVariants && <LangSwitch className="docs-lang-inline" />}
        {doc.headings.length > 0 && (
          <details className="docs-toc-mobile">
            <summary>On this page</summary>
            <nav aria-label="On this page">
              {doc.headings.map((h) => <a key={h.id} href={`#${h.id}`} className={`lvl-${h.level}`}>{h.text}</a>)}
            </nav>
          </details>
        )}
        <div className="docs-content" dangerouslySetInnerHTML={{ __html: doc.html }} />
        <nav className="docs-pager" aria-label="Previous and next pages">
          {doc.prev ? <Link href={doc.prev.href} className="prev"><span>Previous</span><b>{doc.prev.title}</b></Link> : <span />}
          {doc.next && <Link href={doc.next.href} className="next"><span>Next</span><b>{doc.next.title}</b></Link>}
        </nav>
      </article>
      <aside className="docs-rail">
        {doc.hasLanguageVariants && <LangSwitch />}
        <DocsToc headings={doc.headings} />
      </aside>
    </div>
  );
}
