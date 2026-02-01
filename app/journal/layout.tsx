export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-4 p-4 md:p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Journal</h1>
        <p className="text-default-500">Capture your thoughts and moments.</p>
      </header>
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}
