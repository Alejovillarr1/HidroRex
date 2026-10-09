import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} | Soluciones integrales en hidráulica`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  icons: {
    icon: "/H_logohidrorex.svg",
    shortcut: "/H_logohidrorex.svg",
  },
  keywords: [
    "circuitos hidráulicos",
    "cilindros hidráulicos",
    "prensado de mangueras",
    "mecánica de flota pesada",
    "válvulas y bombas hidráulicas",
    "industria petrolera",
    "Hidro Rex",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Soluciones integrales en hidráulica`,
    description: COMPANY.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a1c1f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Chat en vivo / agente de IA de Odoo. El orden de los scripts importa. */}
        <script
          defer
          type="text/javascript"
          src="https://hidrorex1.odoo.com/im_livechat/loader/3"
        />
        <script
          defer
          type="text/javascript"
          src="https://hidrorex1.odoo.com/im_livechat/assets_embed.js"
        />
      </head>
      <body className="font-sans">
        <Navbar />
        {/* El header es fixed (80px): el contenido arranca debajo */}
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
