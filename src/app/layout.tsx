import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kareem Aboualnaga | Technical Lead",
  description: "Technical Lead based in London, UK. Focused on bridging the gap between complex engineering, business objectives, and user needs.",
  keywords: ["Kareem Aboualnaga", "Technical Lead", "Software Engineer", "Frontend", "HubSpot", "AWS", "London", "Web Development"],
  authors: [{ name: "Kareem Aboualnaga" }],
  openGraph: {
    title: "Kareem Aboualnaga | Technical Lead",
    description: "Technical Lead based in London, UK. Focused on bridging the gap between complex engineering, business objectives, and user needs.",
    url: "https://kkmet.com",
    siteName: "Kareem Aboualnaga",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Aboualnaga | Technical Lead",
    description: "Technical Lead based in London, UK. Focused on bridging the gap between complex engineering, business objectives, and user needs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
