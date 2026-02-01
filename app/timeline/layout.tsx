export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-4 p-4 md:p-8">
      <header className="bg-background/70 sticky top-0 z-10 py-2 backdrop-blur-lg">
        <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
        <p className="text-default-500">A chronological journey.</p>
      </header>
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}
