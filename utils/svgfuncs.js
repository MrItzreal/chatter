import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ThemeSVG
export const ThemeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M13.4 2.096a10.08 10.08 0 0 0-8.937 3.331A10.054 10.054 0 0 0 2.096 13.4c.53 3.894 3.458 7.207 7.285 8.246a9.982 9.982 0 0 0 2.618.354l.142-.001a3.001 3.001 0 0 0 2.516-1.426 2.989 2.989 0 0 0 .153-2.879l-.199-.416a1.919 1.919 0 0 1 .094-1.912 2.004 2.004 0 0 1 2.576-.755l.412.197c.412.198.85.299 1.301.299A3.022 3.022 0 0 0 22 12.14a9.935 9.935 0 0 0-.353-2.76c-1.04-3.826-4.353-6.754-8.247-7.284zm5.158 10.909-.412-.197c-1.828-.878-4.07-.198-5.135 1.494-.738 1.176-.813 2.576-.204 3.842l.199.416a.983.983 0 0 1-.051.961.992.992 0 0 1-.844.479h-.112a8.061 8.061 0 0 1-2.095-.283c-3.063-.831-5.403-3.479-5.826-6.586-.321-2.355.352-4.623 1.893-6.389a8.002 8.002 0 0 1 7.16-2.664c3.107.423 5.755 2.764 6.586 5.826.198.73.293 1.474.282 2.207-.012.807-.845 1.183-1.441.894z" />
    <circle cx="7.5" cy="14.5" r="1.5" />
    <circle cx="7.5" cy="10.5" r="1.5" />
    <circle cx="10.5" cy="7.5" r="1.5" />
    <circle cx="14.5" cy="7.5" r="1.5" />
  </svg>
);

// GitHubSVG
export const GitHubIcon = ({ className }) => (
  <Link href="https://github.com/MrItzreal/chatter" target="_blank">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
      />
    </svg>
  </Link>
);

// DeleteSVG
export const DeleteIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z" />
  </svg>
);

// SignOutSVG
export const SignOutIcon = ({ className }) => {
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut({ redirect: false });
      toast.success("See You Next Time!");

      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while signing out.");
    }
  };
  return (
    <button onClick={handleSignOut}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="m2 12 5 4v-3h9v-2H7V8z" />

        <path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z" />
      </svg>
    </button>
  );
};

// EditPencilSVG
export const EditPencil = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="22"
    viewBox="0 0 24 24"
  >
    <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z" />
  </svg>
);

// PlusSignSVG
export const PlusSign = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
  </svg>
);

// SendSVG
export const SendSVG = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z" />
  </svg>
);

// MenuSVG
export const Menu = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z" />
  </svg>
);

//  X-SVG
export const X = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
  </svg>
);
