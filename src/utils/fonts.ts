import { Inter, Lora, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

// Local Fonts
const bogart = localFont({
  src: [
    {
      path: "../../public/fonts/bogart-regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/bogart-bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-bogart",
});

export { inter, lora, source, bogart };
