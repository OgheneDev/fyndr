import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400" })

export const metadata = {
  metadataBase: new URL('https://fyndr.ng'),
  title: {
    default: "Fyndr - Connect with Local Service Providers",
    template: "%s | Fyndr"
  },
  description: "Connect with verified local service providers and merchants in your area. Find the help you need, when you need it.",
  keywords: [
    "local services",
    "service providers",
    "find merchants",
    "local professionals",
    "nearby services",
    "trusted merchants",
    "service marketplace",
    "local business finder"
  ],
  authors: [{ name: "Fyndr" }],
  creator: "Fyndr",
  publisher: "Fyndr",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Fyndr - Your Local Service Marketplace",
    description: "Connect with verified local service providers and merchants in your area. Find the help you need, when you need it.",
    siteName: "Fyndr",
    images: [{
      url: "/images/logo.png",
      width: 1200,
      height: 630,
      alt: "Fyndr - Local Service Marketplace"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fyndr - Find Local Services Near You",
    description: "Connect with trusted local service providers and merchants in your neighborhood",
    images: ["/images/logo.png"],
    creator: "@fyndr"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
