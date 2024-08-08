import "./globals.css";

export const metadata = {
  title: "AI Chat Support",
  description: "AI Chatbot App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
