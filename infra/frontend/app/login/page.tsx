import Link from "next/link"

export default function Login() {
  return (
    <main className="min-h-screen bg-[#FCF9EA] flex flex-col">

      <header className="w-full px-8 py-6">
        <Link href="/" className="flex flex-col leading-none w-fit">
          <span className="text-xl font-bold tracking-tight text-[#0E0E2C]">LAWRORA</span>
          <span className="text-[10px] font-semibold tracking-widest text-[#0E0E2C]/40 uppercase">Legal Ease</span>
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">

          <h1 className="text-3xl font-bold text-[#0E0E2C] mb-2">Welcome back</h1>
          <p className="text-sm text-[#0E0E2C]/50 mb-8">
            Need access?{" "}
            <Link href="/#demo" className="text-[#0E0E2C] font-medium underline underline-offset-2 hover:opacity-70">
              Request a demo
            </Link>
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0E0E2C]/70 mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@yourfirm.com"
                className="w-full rounded-xl border border-[#0E0E2C]/15 bg-white px-4 py-3 text-sm text-[#0E0E2C] placeholder:text-[#0E0E2C]/30 focus:outline-none focus:ring-2 focus:ring-[#0E0E2C]/20"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#0E0E2C]/70" htmlFor="password">Password</label>
                <Link href="#" className="text-xs text-[#0E0E2C]/50 hover:text-[#0E0E2C] transition-colors">Forgot password?</Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#0E0E2C]/15 bg-white px-4 py-3 text-sm text-[#0E0E2C] placeholder:text-[#0E0E2C]/30 focus:outline-none focus:ring-2 focus:ring-[#0E0E2C]/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#0E0E2C] py-3 text-sm font-semibold text-white hover:bg-[#0E0E2C]/85 transition-colors mt-2"
            >
              Log in
            </button>
          </form>

        </div>
      </div>

    </main>
  )
}
