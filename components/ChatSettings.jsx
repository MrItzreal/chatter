import Image from "next/image";
// import Link from "next/link";

const ChatSettings = () => {
  const menuItems = [
    // Array to avoid code repetition.
    { src: "/assets/icons/bx-user.svg", alt: "Theme" },
    { src: "/assets/icons/bx-user.svg", alt: "GitHub" },
    { src: "/assets/icons/bx-user.svg", alt: "Delete" },
    { src: "/assets/icons/bx-user.svg", alt: "Log Out" },
  ];
  return (
    <div className="relative bottom-16 min-h-screen flex items-center p-4">
      <div className="absolute left-1/4 rounded-lg shadow-lg flex">
        <div className="border-2 rounded-l-lg p-2 flex flex-col items-center justify-between">
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
                <Image
                  src={item.src}
                  width={32}
                  height={32}
                  alt={item.alt}
                  className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
                />
              </div>
            ))}
          </div>
          <div className="mt-32">
            {/* Placeholder for additional bottom icon if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
