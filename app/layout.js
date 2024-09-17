import "./globals.css";

export const metadata = {
  title: "Chatter",
  description: "Real-Time Chat App",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-amber-600 font-mono">{children}</body>
    </html>
  );
};

export default RootLayout;
