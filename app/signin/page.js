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

  const fetchUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/chat");
        toast.success("Welcome Back!");
      } else {
        toast.error("Hmmmm, are you sure username/password are correct?");
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
      fetchUser={fetchUser}
    />
  );
};

export default SignInPage;
