"use client";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>)
};

export default Provider;

/* 
-This is a higher order component which means we are wrapping other components with it.
-Since we are using the browser we have to use "use client"*/
