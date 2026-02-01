export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-4 p-4 md:p-8">
      <header className="border-default-200 flex flex-col gap-2 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-default-500">Manage your preferences.</p>
      </header>
      <main className="w-full flex-1 pt-4">{children}</main>
    </div>
  );
}
