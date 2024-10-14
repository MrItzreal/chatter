"use client";
import Link from "next/link";
import Image from "next/image";

const SignIn = ({
  username,
  setUsername,
  password,
  setPassword,
  fetchUser,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser(e);
  };
  return (
    <div className="mx-auto my-20 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="sm:bg-gradient-to-r from-cyan-800 to-blue-500 p-20 m-20 rounded-xl"
      >
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
            alt="username"
          />
          <input
            type="username"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-lock-alt.svg"
            width={25}
            height={25}
            alt="password"
          />
          <input
            type="password"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Sign In Button */}
        <div className="flex flex-col">
          <button
            className="bg-white rounded-lg font-bold text-gray-800 py-2 px-8 mb-2 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <p className="flex justify-center text-white font-extrabold">
            Don't have an account?
          </p>
          <Link
            href="/register"
            className="flex justify-center pr-2 text-white font-extrabold hover:bg-white hover:text-gray-800 duration-700 rounded-lg"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
