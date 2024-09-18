"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  return (
    <div className="mx-auto flex justify-center">
      <form
        onSubmit={() => {}}
        className="bg-gradient-to-r from-cyan-800 to-blue-500 p-20 m-20 rounded-xl"
      >
        <div className="flex justify-center relative bottom-8">
          <h1 className="text-white font-bold text-3xl">Registration</h1>
        </div>

        {/* Name */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-user.svg"
            width={25}
            height={25}
          />
          <input
            type="name"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Full Name"
            required
            value={() => {}}
            onChange={() => {}}
          />
        </div>
        {/* Username */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-user.svg"
            width={25}
            height={25}
          />
          <input
            type="username"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Username"
            required
            value={() => {}}
            onChange={() => {}}
          />
        </div>
        {/* Email */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-envelope.svg"
            width={25}
            height={25}
          />
          <input
            type="email"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Email"
            required
            value={() => {}}
            onChange={() => {}}
          />
        </div>
        {/* Phone Number */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-phone.svg"
            width={25}
            height={25}
          />
          <input
            type="tel"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Phone Number"
            required
            value={() => {}}
            onChange={() => {}}
          />
        </div>
        {/* Password */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-lock-alt.svg"
            width={25}
            height={25}
          />
          <input
            type="password"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Password"
            required
            value={() => {}}
            onChange={() => {}}
          />
        </div>
        {/* Register Button */}
        <div className="flex flex-col justify-center">
          <button
            className="bg-white rounded-lg font-bold text-gray-800 py-2 px-8 mb-2 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <p className="text-gray-800 font-extrabold">
            Already have an account?
          </p>
          <Link
            href="/signin"
            className="flex justify-center pr-2 text-gray-800 font-extrabold hover:bg-white duration-700  rounded-lg"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
