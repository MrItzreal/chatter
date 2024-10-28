"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/chat");
        toast.success(`Welcome Back: ${username}.`);
      } else {
        toast.error("Are Username/Password correct?");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignIn
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      fetchUser={handleSignIn}
    />
  );
};

export default SignInPage;
