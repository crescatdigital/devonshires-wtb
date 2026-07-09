import { getHomePage, getSiteSettings } from "@/lib/cms";

export default async function Home() {
  const [site, home] = await Promise.all([getSiteSettings(), getHomePage()]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-lg font-semibold">{site.name}</span>
        <nav className="flex gap-6">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight">
          {home.hero.heading}
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          {home.hero.subheading}
        </p>
        <a
          href={home.hero.cta.href}
          className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {home.hero.cta.label}
        </a>
      </main>
      <footer className="px-8 py-6 text-center text-sm text-zinc-500">
        {site.footer.copyright}
      </footer>
    </div>
  );
}
