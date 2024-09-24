"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/SignIn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const router = useRouter(); //Initialized the router.
  //NOTE: adding a state for every field in your form is good practice.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SignIn
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default SignInPage;
