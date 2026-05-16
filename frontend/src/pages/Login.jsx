function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#1a1a1a] p-10 rounded-2xl border border-yellow-700 w-[400px]">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
          Jewellery ERP
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black p-4 rounded-lg border border-gray-700 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black p-4 rounded-lg border border-gray-700 outline-none"
          />

          <button className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;