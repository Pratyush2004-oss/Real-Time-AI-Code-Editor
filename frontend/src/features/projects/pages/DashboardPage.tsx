import Navbar from "../../../components/shared/Navbar"

const DashboardPage = () => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]">
      <div className="pointer-events-none absolute -top-40 left-1/3 h-175 w-175 rounded-full bg-white/4 blur-[140px] dark:block" />
      <div className="pointer-events-none absolute right-0 top-1/3 hidden h-125 w-125 rounded-full bg-white/3 blur-[150px] dark:block" />

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* navbar */}
        <Navbar />
      </div>
    </div>
  )
}

export default DashboardPage