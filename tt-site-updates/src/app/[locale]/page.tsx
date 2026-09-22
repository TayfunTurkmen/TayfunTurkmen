import { BlogCard } from "@/components/BlogCard";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/posts";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `Tayfun Türkmen | ${locale === "tr" ? "Web Tasarım • Yapay Zekâ • Veri • Ağlar" : "Web Design • AI • Data • Networking"}`,
    description: t("description"),
    alternates: { canonical: `/${locale}`, languages: { en: "/en", tr: "/tr" } },
  };
}

const portfolioItems = [
  { name: "Prof. Dr. Ali Ayyıldız", logo: "/profdraliayyildiz.png", link: "https://www.profdraliayyildiz.com" },
  { name: "AAIC LTD", logo: "/aaicltd.png", link: "https://www.aaicltd.co.uk" },
  { name: "HPS Health", logo: "/hpshealth.png", link: "https://www.hpshealth.co.uk" },
  { name: "MediGoAcademy", logo: "/medigoacademy.png", link: "https://www.medigoacademy.com" },
  { name: "sahibindenkonutal.com", logo: "/sahibindenkonutal.png", link: "https://www.sahibindenkonutal.com" },
  { name: "Kitapol", logo: "/kitapol.png", link: "https://www.kitapol.com.tr" },
  { name: "Misyonum Sağlık", logo: "/misyonumsaglikvebeslenme.png", link: "https://www.misyonumsaglikvebeslenme.com" },
  { name: "Endova", logo: "/endova.png", link: "#" },
  { name: "Mintekder", logo: "/mintekder.png", link: "#" },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getAllPosts(locale);
  const tr = locale === "tr";
  const latest = posts.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero — full-bleed, minimal brand + CTA */}
      <section className="relative isolate h-[clamp(22rem,58vh,34rem)] overflow-hidden border-b border-[var(--border)] bg-[#0b0b0d]">
        <Image
          src="/tayfun-turkmen-cover.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-media select-none object-cover object-[50%_46%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-9 sm:px-6 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <p className="hero-fade brand-microcopy text-[0.65rem] font-medium uppercase text-white/65">
              {tr ? "Web Tasarım • Yapay Zekâ • Veri • Ağlar" : "Web Design • AI • Data • Networking"}
            </p>
            <h1 className="hero-fade hero-fade-delay-1 mt-3 font-[family-name:var(--font-display)] text-[1.85rem] font-semibold tracking-tight text-white sm:text-4xl">
              Tayfun Türkmen
            </h1>
            <p className="hero-fade hero-fade-delay-2 mt-2 max-w-md text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
              {tr
                ? "Kurumsal web ve dijital sistemler."
                : "Corporate web and digital systems."}
            </p>
            <div className="hero-fade hero-fade-delay-3 mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#portfolio"
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-[#09090b] transition-opacity hover:opacity-90"
              >
                {tr ? "Projeler" : "Projects"}
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/25 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                {tr ? "İletişim" : "Contact"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="border-y border-[var(--border)] bg-[var(--chip)] px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="brand-microcopy text-[0.68rem] font-semibold uppercase text-[var(--muted)]">
              {tr ? "ÖNE ÇIKAN İŞLER" : "SELECTED WORK"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
              {tr ? "Referanslar ve Çalışmalar" : "References & Work"}
            </h2>
            <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
              {tr ? "Geliştirdiğimiz kurumsal web siteleri ve dijital çözümler." : "Corporate websites and digital solutions we've developed."}
            </p>
          </div>
          
          <div className="grid grid-cols-2 items-center justify-items-center gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {portfolioItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex aspect-[4/3] w-full items-center justify-center rounded-md border border-black/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md sm:p-6"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-[72%] max-w-[82%] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights (Blog) */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              {tr ? "Son yazılar" : "Latest Insights"}
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              {tr ? "Web teknolojileri ve yapay zekâ üzerine makaleler." : "Articles on web technologies and AI."}
            </p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-[var(--accent)] hover:underline mb-2">
            {tr ? "Tümünü oku →" : "Read All →"}
          </Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((post) => <BlogCard key={post.slug} post={post} locale={locale} />)}
        </div>
      </section>
    </div>
  );
}
