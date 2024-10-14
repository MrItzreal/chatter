"use client";
import Link from "next/link";
import Image from "next/image";

const Register = ({
  fullname,
  setFullName,
  username,
  setUsername,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  createNewUser,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewUser(e);
  };

  return (
    <div className="mx-auto my-20 flex justify-center">
      <form
        onSubmit={handleSubmit}
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
            alt="name"
          />
          <input
            type="name"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Full Name"
            required
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
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
        {/* Email */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-envelope.svg"
            width={25}
            height={25}
            alt="email"
          />
          <input
            type="email"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Phone Number */}
        <div className="mb-4 relative">
          <Image
            className="absolute bottom-2 left-2"
            src="/assets/icons/bx-phone.svg"
            width={25}
            height={25}
            alt="Phone"
          />
          <input
            type="tel"
            className="border rounded py-2 px-3 pl-10"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        {/* Register Button */}
        <div className="flex flex-col justify-center">
          <button
            className="bg-white rounded-lg font-bold text-gray-800 py-2 px-8 mb-2 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <p className="flex justify-center text-white font-extrabold">
            Already have an account?
          </p>
          <Link
            href="/signin"
            className="flex justify-center pr-2 text-white font-extrabold hover:bg-white hover:text-gray-800 duration-700 rounded-lg"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
