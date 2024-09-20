import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import { bogart, inter, lora, source } from "~/utils/fonts";

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
        className={`${GeistSans.variable} ${inter.variable} ${bogart.variable} ${lora.variable} ${source.variable} h-full`}
      >
        <body className="h-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
