import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        <title>Chai Logic - Logic in every Bite and Sip</title>
        <meta name="description" content="A modern café experience where every cup tells a story" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
