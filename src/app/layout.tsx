import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { inter, bogart, lora, source } from "~/utils/fonts";

export const metadata: Metadata = {
  title: "What-Todo",
  description: "Keep track of your tasks and know What-Todo",
  icons: [
    {
      url: "/icon.png",
      href: "/icon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html
        lang="en"
        className={`${GeistSans.variable} ${inter.variable} ${bogart.variable} ${lora.variable} ${source.variable} dark`}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
