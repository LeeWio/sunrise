export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4 p-4 md:p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-default-500">Overview of your life log.</p>
      </header>
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
