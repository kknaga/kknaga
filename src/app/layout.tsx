import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

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
        {GA_TRACKING_ID && process.env.NODE_ENV === "production" && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
