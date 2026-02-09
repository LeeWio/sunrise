export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}
