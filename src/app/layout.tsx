import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { UserProvider } from "@/contexts/User";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Momentive",
  description: "A platform where community members can view, sign up for, and add events to their personal calendars, while staff members can create and manage events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProviderWrapper>
	  	<UserProvider>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
			{children}
			</body>
		</UserProvider>
      </ThemeProviderWrapper>
    </html>
  );
}
