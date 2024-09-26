import "./globals.css";
import Particle from "@/utils/particle";
import { ToastContainer } from "react-toastify";
import Provider from "@components/Provider";

export const metadata = {
  title: "Chatter",
  description: "Real-Time Chat App",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-slate-700 font-mono">
        <Provider>
          {children}
          <Particle />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
