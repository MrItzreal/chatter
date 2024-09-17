

const Register = () => {
  return (
    <div
      className="mx-auto flex justify-center"
      id="particles-js"
      src="particles.js"
    >
      <form className="bg-gradient-to-r from-cyan-800 to-blue-500 p-20 m-20 rounded-xl">
        <div className="flex justify-center relative bottom-8">
          <h1 className="text-white font-bold text-3xl">Registration</h1>
        </div>

        {/* Name */}
        <div className="mb-4">
          <input
            type="name"
            className="border rounded py-2 px-3"
            placeholder="Full Name"
            required
            value={""}
            onChange={""}
          />
        </div>
        {/* Username */}
        <div className="mb-4">
          <input
            type="username"
            className="border rounded py-2 px-3"
            placeholder="Username"
            required
            value={""}
            onChange={""}
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            className="border rounded py-2 px-3"
            placeholder="Email"
            required
            value={""}
            onChange={""}
          />
        </div>
        {/* Phone Number */}
        <div className="mb-4">
          <input
            type="tel"
            className="border rounded py-2 px-3"
            placeholder="Phone Number"
            required
            value={""}
            onChange={""}
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            className="border rounded py-2 px-3"
            placeholder="Password"
            required
            value={""}
            onChange={""}
          />
        </div>
        {/* Register Button */}
        <div className="flex justify-center">
          <button
            className="bg-white rounded-lg font-bold text-gray-400 py-2 px-8 focus:outline-none focus:shadow-outline"
            onClick={""}
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
