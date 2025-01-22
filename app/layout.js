import "./globals.css";
import Particle from "@utils/Particle";
import { ToastContainer } from "react-toastify";
import Provider from "@components/Provider";

export const metadata = {
  title: "Chatter",
  description: "Real-Time Chat App",
  icons: "/assets/icons/favicon.png",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-bglayout font-mono">
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
