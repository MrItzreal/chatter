"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Register from "@/components/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const router = useRouter(); //Initialized the router.
  //NOTE: adding a state for every field in your form is good practice.
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const createNewUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/new-user", {
        method: "POST",
        body: JSON.stringify({
          fullname,
          username,
          email,
          phone,
          password,
        }),
      });
      if (res.ok) {
        router.push("/signin");
        toast.success("Registration was a success!");
      } else {
        toast.error("Email or Username already exists!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Register
      fullname={fullname}
      setFullName={setFullName}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      password={password}
      setPassword={setPassword}
      createNewUser={createNewUser}
    />
  );
};

export default RegisterForm;
