import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import { EB_Garamond, Montserrat, Dancing_Script } from "next/font/google";
import "../globals.css";
import { Suspense } from "react";
import QueryProvider from "@/components/QueryProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ComingSoon from "@/components/ComingSoon";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pencils and Prayers | Homeschooling with Intent",
  description: "A space for creative expressions and spiritual reflections on motherhood and education.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isSiteEnabled = process.env.NEXT_PUBLIC_SITE_ENABLED === 'true';

  return (
    <html lang={locale}>
      <body
        className={`${ebGaramond.variable} ${montserrat.variable} ${dancingScript.variable} antialiased selection:bg-primary/20`}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        }>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              {isSiteEnabled ? (
                <div className="min-h-screen flex flex-col">
                  {children}
                </div>
              ) : (
                <ComingSoon />
              )}
            </NextIntlClientProvider>
          </QueryProvider>
        </Suspense>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
