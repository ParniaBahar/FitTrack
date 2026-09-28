
const Header = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-3xl px-6 pt-10 pb-25 text-white shadow-lg">
      <p className="text-green-100 text-sm font-medium">Welcome back</p>

      <h1 className="mt-2 text-3xl font-bold">Hi there! 👋 ParniaBahar</h1>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-full items-center py-8 px-6 gap-2 rounded-2xl bg-white/20">
          <span className='text-2xl'> 💪</span>
          <p className="text-green-50 text-l">
            Ready to crush today? Start logging!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header