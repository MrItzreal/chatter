import Image from "next/image";
import { ThemeIcon, GitHubIcon, DeleteIcon, LogoutIcon } from "@utils/svgfuncs";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";

const ChatSettings = () => {
  const menuItems = [
    // Array to avoid code repetition.
    { Icon: ThemeIcon, alt: "Theme" },
    { Icon: GitHubIcon, alt: "GitHub" },
    { Icon: DeleteIcon, alt: "Delete" },
    { Icon: LogoutIcon, alt: "Log Out" },
  ];
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="rounded-lg shadow-lg flex scale-100 sm:scale-110">
        <div className="bg-sky-600 border-2 rounded-l-lg p-2 flex flex-col items-center justify-between">
          <div className="mb-8">
            <Image
              src="/assets/icons/favicon.png"
              width={42}
              height={42}
              alt="App logo"
            />
          </div>
          <div className="mt-28 space-y-6">
            {menuItems.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <item.Icon className="w-9 h-9 fill-slate-200 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80" />
              </div>
            ))}
          </div>
          <div className="mt-32">
            {/* Placeholder for additional bottom icon if needed */}
          </div>
        </div>
        <ChatList />
        <ChatFeed />
      </div>
    </div>
  );
};

export default ChatSettings;
