import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const noto = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tamikascustomweaves.com"),
  title: {
    default: "Tamika Custom Weave | Premium Luxury Hair Extensions",
    template: "%s | Tamika Custom Weave",
  },
  description: "Premium luxury hair extensions, custom wigs, and professional installation services tailored to perfection.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.tamikascustomweaves.com",
    siteName: "Tamika Custom Weave",
    title: "Tamika Custom Weave | Premium Luxury Hair Extensions",
    description: "Premium luxury hair extensions, custom wigs, and professional installation services tailored to perfection.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Tamika Custom Weave Luxury Extensions",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamika Custom Weave",
    description: "Premium luxury hair extensions and custom wigs.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tamika Custom Weave",
    url: "https://www.tamikascustomweaves.com",
    logo: "https://www.tamikascustomweaves.com/tamikas-logo.png",
    description: "Premium luxury hair extensions, custom wigs, and professional installation services.",
    sameAs: [],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${noto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-white text-brand-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
