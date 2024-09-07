import { Navbar } from "./_components/navbar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      {children}
    </div>
  );
}
