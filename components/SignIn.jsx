"use client";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="mx-auto flex justify-center">
      <form className="bg-gradient-to-r from-cyan-800 to-blue-500 p-20 m-20 rounded-xl">
        <div className="flex justify-center relative bottom-8">
          <h1 className="text-white font-bold text-3xl">Welcome Back!</h1>
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
            value={""}
            onChange={""}
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
            value={""}
            onChange={""}
          />
        </div>
        {/* Sign In Button */}
        <div className="flex flex-col">
          <button
            className="bg-white rounded-lg font-bold text-gray-800 py-2 px-8 mb-2 focus:outline-none focus:shadow-outline"
            onClick={""}
            type="submit"
          >
            Sign In
          </button>
          <p className="flex justify-center text-gray-800 font-extrabold">
            Don't have an account?
          </p>
          <Link
            href="/register"
            className="flex justify-center pr-2 text-gray-800 font-extrabold hover:bg-white rounded-lg"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
