import "./globals.css";
import Particle from "@/utils/Particle";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
