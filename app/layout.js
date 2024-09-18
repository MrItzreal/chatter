import "./globals.css";
import Particle from "@/utils/Particle";

export const metadata = {
  title: "Chatter",
  description: "Real-Time Chat App",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-slate-700 font-mono">
        {children}
        <Particle />
      </body>
    </html>
  );
};

export default RootLayout;
