import "./globals.css";

export const metadata = {
  title: "The Story Log – Ahammed Nibras",
  description:
    "What broke, how we fixed it, and the single principle learned that day. Practical coding stories and lessons from real-world experience.",
  openGraph: {
    title: "The Story Log – Ahammed Nibras",
    description:
      "What broke, how we fixed it, and the single principle learned that day. Practical coding stories and lessons from real-world experience.",
    url: "https://ahammednibras.is-a.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The Story Log – Ahammed Nibras",
    description:
      "What broke, how we fixed it, and the single principle learned that day. Practical coding stories and lessons from real-world experience.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
