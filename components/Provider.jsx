"use client";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;

/* 
-This is a higher order component which means we are wrapping other components with it.
-Since we are using the browser we have to use "use client".
-The **SessionProvider** component from NextAuth already handles fetching and managing the session data internally. You don't need to pass the **session** prop explicitly to the Provider component.*/
