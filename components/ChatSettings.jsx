"use client";
import Image from "next/image";
import {
  ThemeIcon,
  GitHubIcon,
  DeleteIcon,
  SignOutIcon,
  X,
} from "@utils/svgfuncs";

const ChatSettings = ({ isVisible, toggleNavbar, chatSelect }) => {
  const menuItems = [
    { Icon: ThemeIcon, alt: "Theme" },
    { Icon: GitHubIcon, alt: "GitHub" },
    { Icon: DeleteIcon, alt: "Delete", chatSelect: chatSelect },
    { Icon: SignOutIcon, alt: "Log Out" },
  ];

  return (
    <div className="h-full">
      <div className="bg-sky-600 border-2 rounded-l-lg p-2 flex flex-col items-center h-full">
        <div className="mb-8">
          {!isVisible ? (
            <Image
              src="/assets/icons/favicon.png"
              width={44}
              height={44}
              alt="App logo"
              className="w-11 h-11"
            />
          ) : (
            <button
              onClick={toggleNavbar}
              className="sm:hidden absolute inset-x-2"
            >
              <X className="h-10 w-10 fill-white" />
            </button>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center space-y-6">
          {menuItems.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <item.Icon className="w-10 h-10 fill-slate-200 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
