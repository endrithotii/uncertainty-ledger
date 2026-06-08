import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const BASE_URL = "https://uncertainty-ledger.vercel.app"

export const viewport: Viewport = {
  themeColor: "#06060f",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Uncertainty Ledger — Know what you don't know before it's too late",
    template: "%s | Uncertainty Ledger",
  },
  description:
    "Uncertainty Ledger tracks the unknowns killing your software projects before they kill your timeline. A real-time risk score, cluster analysis, and a one-link report your CEO can read in 60 seconds.",
  keywords: [
    "software project risk",
    "engineering project management",
    "project uncertainty tracking",
    "CTO tools",
    "VP engineering tools",
    "epistemic debt",
    "project risk score",
    "software delivery risk",
    "engineering risk management",
    "project health dashboard",
  ],
  authors: [{ name: "Uncertainty Ledger" }],
  creator: "Uncertainty Ledger",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Uncertainty Ledger",
    title: "Uncertainty Ledger — Know what you don't know before it's too late",
    description:
      "Track the unknowns killing your software projects. Real-time risk score. One link to brief your CEO in 60 seconds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uncertainty Ledger — Project risk made visible",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncertainty Ledger — Know what you don't know before it's too late",
    description:
      "Track the unknowns killing your software projects. Real-time risk score. One link to brief your CEO in 60 seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: BASE_URL },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Uncertainty Ledger",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "Track the unresolved unknowns in your software projects. Real-time risk scoring, cluster analysis, and stakeholder-ready reports.",
              url: BASE_URL,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "Real-time project risk scoring",
                "Epistemic debt tracking",
                "Cluster heatmap analysis",
                "30-day trajectory charts",
                "Shareable stakeholder reports",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
