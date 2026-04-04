export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Sunrise</h1>
        <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">
          Your dynamic personal digital space.
        </p>
      </header>
      
      {/* 示例：展示模块如何自然地铺满整个响应式容器，而不会被强行居中限制 */}
      <section className="w-full rounded-2xl bg-zinc-200/50 dark:bg-zinc-900/50 p-6 md:p-12 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold mb-4">Latest Moments</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          The content here flows naturally across the entire screen width. It adapts beautifully to any device without being artificially constrained to a traditional 1024px or 1280px column in the middle.
        </p>
      </section>
    </div>
  );
}
