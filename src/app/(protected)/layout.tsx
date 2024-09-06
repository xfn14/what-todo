import { Navbar } from "./_components/navbar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
